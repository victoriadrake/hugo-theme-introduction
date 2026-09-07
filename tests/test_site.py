"""Production-build regressions. Uses only Python's standard library and Hugo."""
import importlib.util
import os
from pathlib import Path
import shutil
import socket
import time
from urllib.request import urlopen
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('check_html', ROOT / 'scripts/check_html.py')
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class HTMLCheckerTests(unittest.TestCase):
    def test_empty_output_fails(self):
        with tempfile.TemporaryDirectory() as directory:
            count, errors = checker.check_site(directory, 'https://example.test/')
            self.assertEqual(count, 0)
            self.assertTrue(errors)

    def test_missing_links_assets_and_fragments_fail(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'index.html').write_text('<a href="missing/">Page</a><img src="missing.png"><a href="#missing">Jump</a>')
            count, errors = checker.check_site(root, 'https://example.test/')
            self.assertEqual(count, 1)
            self.assertEqual(len(errors), 3)

    def test_placeholder_asset_hosts_fail(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'index.html').write_text('<img src="https://example.com/photo.jpg"><script src="http://example.com/bundle.js"></script>')
            count, errors = checker.check_site(root, 'https://demo.test/', {'example.com'})
            self.assertEqual(count, 1)
            self.assertEqual(len(errors), 2)
            self.assertTrue(all('placeholder host' in error for error in errors))

    def test_subpath_and_external_links(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'index.html').write_text('<h1 id="hello">Hi</h1><a href="/theme/#hello">Home</a><a href="https://elsewhere.test/">External</a>')
            self.assertEqual(checker.check_site(root, 'https://example.test/theme/'), (1, []))


class ThemeBuildTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not shutil.which('hugo'):
            raise RuntimeError('Install Hugo extended 0.163.0+ before running the tests.')
        if not (ROOT / 'node_modules/.bin/postcss').exists():
            raise RuntimeError('Run npm ci --ignore-scripts before running the tests.')
        cls.temporary = tempfile.TemporaryDirectory(prefix='introduction-tests-')
        cls.theme = Path(cls.temporary.name) / 'theme'
        shutil.copytree(ROOT, cls.theme, ignore=shutil.ignore_patterns(
            '.git', '.claude', 'node_modules', 'resources', 'docs', 'public', '__pycache__', '.hugo_build.lock'))
        (cls.theme / 'node_modules').symlink_to(ROOT / 'node_modules', target_is_directory=True)
        cls.content = cls.theme / 'exampleSite/content/en'
        cls.build()
        cls.baseline = (cls.theme / 'docs/index.html').read_text()

    @classmethod
    def tearDownClass(cls):
        cls.temporary.cleanup()

    @classmethod
    def build(cls, base_url='https://example.test/', *args):
        env = dict(os.environ, HUGO_BASEURL=base_url)
        result = subprocess.run(['sh', str(cls.theme / 'scripts/build_docs.sh'), *args],
                                cwd=cls.temporary.name, env=env, capture_output=True, text=True)
        if result.returncode:
            raise AssertionError(result.stdout + result.stderr)
        if 'deprecated' in (result.stdout + result.stderr).lower():
            raise AssertionError('Deprecated Hugo API used:\n' + result.stdout + result.stderr)

    def test_baseline_and_internal_links(self):
        self.build()
        count, errors = checker.check_site(self.theme / 'docs', 'https://example.test/', {'example.com'})
        self.assertGreater(count, 50)
        self.assertEqual(errors, [])

    def test_dev_server_defaults_to_localhost(self):
        with socket.socket() as listener:
            listener.bind(('127.0.0.1', 0))
            port = listener.getsockname()[1]
        env = dict(os.environ)
        env.pop('HUGO_BASEURL', None)
        process = subprocess.Popen([
            'sh', str(self.theme / 'scripts/build_docs.sh'), 'server',
            '--watch=false', '--port', str(port), '--destination', str(self.theme / 'dev-output')
        ], cwd=self.temporary.name, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        html = None
        try:
            deadline = time.monotonic() + 15
            while time.monotonic() < deadline and process.poll() is None:
                try:
                    with urlopen(f'http://127.0.0.1:{port}/', timeout=1) as response:
                        html = response.read().decode()
                    break
                except OSError:
                    time.sleep(0.05)
        finally:
            process.terminate()
            output = process.communicate(timeout=5)[0]
        self.assertIsNotNone(html, output)
        self.assertIn(f'http://localhost:{port}/', html)
        self.assertNotIn(f'hugo-introduction.netlify.app:{port}', html)

    def test_draft_contact_and_home_sections_are_hidden(self):
        files = [self.content / 'home/contact.md', self.content / 'home/about.md']
        originals = {path: path.read_text() for path in files}
        try:
            for path, text in originals.items():
                path.write_text(text.replace('---', '---\ndraft: true', 1) + '\nPRIVATE-DRAFT-MARKER\n')
            self.build()
            html = (self.theme / 'docs/index.html').read_text()
            self.assertNotIn('PRIVATE-DRAFT-MARKER', html)
            page = checker.Page(html)
            self.assertNotIn('contact', page.ids)
            self.assertNotIn('about', page.ids)
            self.assertNotIn('#contact', page.references)
        finally:
            for path, text in originals.items():
                path.write_text(text)

    def test_sections_without_index_files(self):
        files = [self.content / section / '_index.md' for section in ('blog', 'projects')]
        originals = {path: path.read_bytes() for path in files}
        try:
            for path in files:
                path.unlink()
            self.build()
            page = checker.Page((self.theme / 'docs/index.html').read_text())
            self.assertIn('blogs', page.ids)
            self.assertIn('/#blogs', page.references)
            self.assertIn('projects', page.ids)
        finally:
            for path, text in originals.items():
                path.write_bytes(text)

    def test_page_description_and_site_fallback(self):
        post = self.content / 'blog/review-description.md'
        try:
            post.write_text('---\ntitle: Metadata regression\ndescription: Unique page description\n---\nHello\n')
            self.build()
            html = (self.theme / 'docs/blog/review-description/index.html').read_text()
            self.assertRegex(html, r'name=\"?description\"? content="Unique page description"')
            self.assertRegex(self.baseline, r'name=\"?description\"? content="Website Description"')
        finally:
            post.unlink()

    def test_project_links_and_dialog_semantics(self):
        html = self.baseline
        self.assertIn('role=dialog', html)
        self.assertIn('aria-modal=true', html)
        self.assertIn('aria-haspopup=dialog', html)
        page = checker.Page(html)
        self.assertTrue(any('/projects/photography/' in ref for ref in page.references))
        self.assertIn('project-title-0', page.ids)

    def test_subpath_build(self):
        self.build('https://example.test/theme/')
        count, errors = checker.check_site(self.theme / 'docs', 'https://example.test/theme/')
        self.assertGreater(count, 50)
        self.assertEqual(errors, [])
