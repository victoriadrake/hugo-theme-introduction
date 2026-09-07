#!/usr/bin/env python3
"""Check a generated site's internal links, fragments, and linked assets."""
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.references = []
        self.duplicates = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        identifier = attrs.get('id') or (attrs.get('name') if tag == 'a' else None)
        if identifier:
            if identifier in self.ids:
                self.duplicates.append(identifier)
            self.ids.add(identifier)
        attribute = 'href' if tag in ('a', 'area', 'link') else 'src'
        if tag in ('a', 'area', 'link', 'script', 'img', 'source', 'iframe'):
            value = attrs.get(attribute)
            if value is not None:
                self.references.append(value)


def check_site(directory, base_url, forbidden_hosts=()):
    root = Path(directory).resolve()
    files = sorted(root.rglob('*.html'))
    if not files:
        return 0, ['No HTML files found: ' + str(root)]
    pages = {path: Page(path.read_text(encoding='utf-8')) for path in files}
    base = urlsplit(base_url)
    prefix = base.path.rstrip('/') + '/'
    errors = []
    for path, page in pages.items():
        relative = path.relative_to(root).as_posix()
        page_url = urljoin(base_url.rstrip('/') + '/', relative)
        for identifier in page.duplicates:
            errors.append(f'{relative}: duplicate id {identifier!r}')
        for reference in page.references:
            target = urlsplit(urljoin(page_url, reference))
            if target.hostname in forbidden_hosts:
                errors.append(f'{relative}: forbidden placeholder host: {reference}')
                continue
            if target.scheme not in ('http', 'https') or target.netloc != base.netloc:
                continue
            target_path = unquote(target.path)
            if not target_path.startswith(prefix):
                errors.append(f'{relative}: link outside site base path: {reference}')
                continue
            destination = (root / target_path[len(prefix):]).resolve()
            if root not in destination.parents and destination != root:
                errors.append(f'{relative}: link escapes output directory: {reference}')
                continue
            if destination.is_dir():
                destination /= 'index.html'
            if not destination.is_file():
                errors.append(f'{relative}: missing target: {reference}')
            elif target.fragment and destination in pages:
                fragment = unquote(target.fragment).split(':~:text=')[0]
                if fragment and fragment not in pages[destination].ids:
                    errors.append(f'{relative}: missing fragment: {reference}')
    return len(files), errors


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory')
    parser.add_argument('--base-url', required=True)
    parser.add_argument('--forbid-host', action='append', default=[])
    args = parser.parse_args()
    count, errors = check_site(args.directory, args.base_url, args.forbid_host)
    print(f'Checked {count} HTML files.')
    for error in errors:
        print(error)
    raise SystemExit(bool(errors))
