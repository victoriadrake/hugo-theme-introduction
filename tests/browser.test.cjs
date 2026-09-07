const assert = require('node:assert/strict')
const { before, after, test } = require('node:test')
const fs = require('node:fs')
const path = require('node:path')
const os = require('node:os')
const http = require('node:http')
const { execFileSync } = require('node:child_process')
const { chromium } = require('playwright-core')

const root = path.resolve(__dirname, '..')
let temporary, server, browser, baseURL

before(async () => {
  temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'introduction-browser-'))
  const theme = path.join(temporary, 'theme')
  const excluded = new Set(['.git', '.claude', 'node_modules', 'resources', 'docs', 'public', '__pycache__', '.hugo_build.lock'])
  fs.cpSync(root, theme, { recursive: true, filter: source => !excluded.has(path.basename(source)) })
  fs.symlinkSync(path.join(root, 'node_modules'), path.join(theme, 'node_modules'), 'dir')
  const external = path.join(theme, 'exampleSite/content/en/projects/external')
  fs.mkdirSync(external)
  fs.writeFileSync(path.join(external, 'index.md'), '---\ntitle: External project\nweight: -10\nexternal_link: https://example.org/\n---\nExternal link fixture.\n')
  const contact = path.join(theme, 'exampleSite/content/en/home/contact.md')
  fs.writeFileSync(contact, fs.readFileSync(contact, 'utf8').replace('---', '---\ndraft: true') + '\nPRIVATE-CONTACT\n')
  const output = path.join(theme, 'docs')
  server = http.createServer((request, response) => {
    const requested = path.resolve(output, '.' + decodeURIComponent(new URL(request.url, baseURL).pathname))
    if (!requested.startsWith(output + path.sep) && requested !== output) {
      response.writeHead(403).end()
      return
    }
    const file = fs.existsSync(requested) && fs.statSync(requested).isDirectory() ? path.join(requested, 'index.html') : requested
    if (!fs.existsSync(file)) {
      response.writeHead(404).end()
      return
    }
    const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.ttf': 'font/ttf' }
    response.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream')
    fs.createReadStream(file).pipe(response)
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  baseURL = `http://127.0.0.1:${server.address().port}/`
  execFileSync('sh', [path.join(theme, 'scripts/build_docs.sh')], {
    cwd: temporary, env: { ...process.env, HUGO_BASEURL: baseURL }, stdio: 'pipe'
  })
  browser = await chromium.launch({ channel: 'chrome', headless: true })
})

after(async () => {
  if (browser) await browser.close()
  if (server) await new Promise(resolve => server.close(resolve))
  if (temporary) fs.rmSync(temporary, { recursive: true, force: true })
})

async function visit(options = {}) {
  const page = await browser.newPage({ reducedMotion: 'reduce', ...options })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(baseURL)
  return { page, errors }
}

test('mobile menu responds to keyboard and reports its state', async () => {
  const { page } = await visit({ viewport: { width: 390, height: 844 } })
  try {
    const menu = page.getByRole('button', { name: 'menu', exact: true })
    await menu.focus()
    await page.keyboard.press('Enter')
    assert.equal(await menu.getAttribute('aria-expanded'), 'true')
    await page.keyboard.press('Escape')
    assert.equal(await menu.getAttribute('aria-expanded'), 'false')
    assert.equal(await menu.evaluate(element => element === document.activeElement), true)
    await page.keyboard.press('Space')
    assert.equal(await menu.getAttribute('aria-expanded'), 'true')
    await page.locator('#navMenu a').first().click()
    assert.equal(await menu.getAttribute('aria-expanded'), 'false')
  } finally { await page.close() }
})

test('project dialog opens by keyboard, traps focus, and returns it on Escape', async () => {
  const { page, errors } = await visit()
  try {
    const trigger = page.locator('.card[data-target] a[aria-haspopup="dialog"]').first()
    await trigger.focus()
    await page.keyboard.press('Enter')
    const dialog = page.getByRole('dialog').filter({ visible: true })
    await dialog.waitFor({ state: 'visible' })
    assert.equal(await dialog.getAttribute('aria-modal'), 'true')
    assert.equal(await dialog.locator('.modal-close').evaluate(element => element === document.activeElement), true)
    await page.keyboard.press('Tab')
    assert.equal(await dialog.evaluate(element => element.contains(document.activeElement)), true)
    await page.keyboard.press('Shift+Tab')
    assert.equal(await dialog.locator('.modal-close').evaluate(element => element === document.activeElement), true)
    await page.keyboard.press('Escape')
    assert.equal(await page.locator('.modal.is-active').count(), 0)
    assert.equal(await trigger.evaluate(element => element === document.activeElement), true)
    assert.equal(await page.locator('html').evaluate(element => element.classList.contains('modal-open')), false)
    assert.deepEqual(errors, [])
  } finally { await page.close() }
})

test('external project card background does not open a dialog or lock scrolling', async () => {
  const { page } = await visit()
  try {
    const card = page.locator('.card').filter({ hasText: 'External project' })
    await card.click({ position: { x: 5, y: 5 } })
    assert.equal(await page.locator('.modal.is-active').count(), 0)
    assert.equal(await page.locator('html').evaluate(element => element.classList.contains('modal-open')), false)
    assert.equal(await card.locator('a').getAttribute('href'), 'https://example.org/')
  } finally { await page.close() }
})

test('draft contact is hidden and the local-time script remains safe', async () => {
  const { page, errors } = await visit()
  try {
    assert.equal(await page.locator('#contact').count(), 0)
    assert.equal(await page.getByText('PRIVATE-CONTACT').count(), 0)
    await page.evaluate(() => update_localtime())
    assert.deepEqual(errors, [])
  } finally { await page.close() }
})

test('project links work without JavaScript', async () => {
  const { page } = await visit({ javaScriptEnabled: false })
  try {
    const trigger = page.locator('.card[data-target] a').first()
    const target = await trigger.getAttribute('href')
    await trigger.click()
    assert.equal(page.url(), target)
    assert.equal(await page.locator('h1').count(), 1)
  } finally { await page.close() }
})

test('gallery still initializes and advances', async () => {
  const { page, errors } = await visit()
  try {
    await page.goto(baseURL + 'projects/photography/')
    const carousel = page.locator('.owl-carousel.owl-loaded')
    await carousel.waitFor({ state: 'visible' })
    const firstSource = await carousel.locator('.owl-item.active img').getAttribute('src')
    await carousel.locator('.owl-next').click()
    await page.waitForFunction(source => document.querySelector('.owl-item.active img').getAttribute('src') !== source, firstSource)
    assert.deepEqual(errors, [])
  } finally { await page.close() }
})


test('images decode on the home, translated home, and project pages', async () => {
  const { page } = await visit()
  try {
    for (const route of ['', 'es/', 'de/', 'projects/', 'projects/photography/', 'projects/design/', 'projects/writing/']) {
      await page.goto(baseURL + route)
      const images = await page.locator('img').evaluateAll(async elements => {
        return Promise.all(elements.map(async image => {
          try { await image.decode() } catch (_) {}
          return { source: image.currentSrc || image.src, width: image.naturalWidth, height: image.naturalHeight }
        }))
      })
      assert.ok(images.length > 0, `No images on ${route || '/'}`)
      for (const image of images) {
        assert.ok(image.width > 0 && image.height > 0, `Image failed to decode: ${image.source}`)
        assert.equal(new URL(image.source).origin, new URL(baseURL).origin)
      }
    }
  } finally { await page.close() }
})
