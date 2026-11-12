const { test, expect } = require('@playwright/test')
const SCREENSHOTS = 'test-results'
const STATS_URL = 'https://stats.132-145-134-25.sslip.io/public.json'
const windows = allTime => ({ d7: allTime, d30: allTime, allTime })
const trend = games => Array.from({ length: 30 }, (_, i) => ({ day: `2026-10-${String(i + 1).padStart(2, '0')}`, games: games * (i % 5) }))
const statsApp = (id, name, games, players, extra = {}) => ({ id, name, discordOnly: false, games: windows(games), players: windows(players), servers: { allTime: 4 }, discordInstalls: 12, trend: trend(games ? 3 : 0), trackingSince: '2026-10-06', visits: null, ...extra })

function statsFixture() {
  return {
    generatedAt: new Date().toISOString(),
    total: { ...statsApp('all', 'All Activities', 9876, 2345), id: undefined },
    apps: [
      statsApp('taboo', 'Taboo Party', 5000, 900, { visits: 80000 }),
      statsApp('thoughtmatch', 'ThoughtMatch', 40, 30, { discordInstalls: null }),
      statsApp('tictactoe', 'Tic Tac Toe', 2000, 300, { discordOnly: true }),
      statsApp('guessthedistrict', 'Guess the District', 2836, 1115),
      statsApp('amalgummy', 'Cosmix', 0, 0, { discordOnly: true, discordInstalls: null, servers: { allTime: 0 }, trackingSince: null }),
    ],
  }
}

const serveStats = page => page.route(STATS_URL, route => route.fulfill({ json: statsFixture(), headers: { 'access-control-allow-origin': '*' } }))
const killStats = page => page.route(STATS_URL, route => route.abort('failed'))

test('homepage has usable navigation, real images, and a pausable 3D scene', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('out of the notebook')
  await page.getByRole('button', { name: 'Pause 3D animation' }).click()
  await expect(page.locator('.field-stage')).toHaveAttribute('data-paused', 'true')
  await page.getByRole('button', { name: 'Show Taboo Party scene' }).click()
  await expect(page.locator('.field-stage')).toHaveAttribute('data-scene', 'cards')
  await expect(page.locator('.field-caption')).toContainText('Taboo')
  await expect(page.getByText('Grand Blanc, MI').first()).toBeVisible()
  await expect(page.locator('.project-card')).toHaveCount(3)
  await page.locator('.project-card').last().scrollIntoViewIfNeeded()
  expect(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true)
  await page.evaluate(() => scrollTo(0, 0))
  await page.screenshot({ path: `${SCREENSHOTS}/home-desktop.png`, fullPage: true })
  expect(errors).toEqual([])
})

test('mobile navigation and layout fit the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.locator('.project-card').last().scrollIntoViewIfNeeded()
  await expect(page.locator('.project-card').last().locator('img')).toHaveJSProperty('complete', true)
  await page.evaluate(() => scrollTo(0, 0))
  await page.screenshot({ path: `${SCREENSHOTS}/home-mobile.png`, fullPage: true })
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Contact' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('hello')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: `${SCREENSHOTS}/contact-mobile.png`, fullPage: true })
})

test('project filters are keyboard-accessible and recover from no results', async ({ page }) => {
  await page.goto('/projects/')
  await expect(page.locator('.project-card')).toHaveCount(12)
  await page.getByRole('textbox', { name: 'Search projects' }).fill('Taboo')
  await expect(page.locator('.project-card')).toHaveCount(1)
  await expect(page.getByRole('link', { name: 'Play on Discord' })).toHaveAttribute('href', 'https://discord.com/discovery/applications/1468756639938252891')
  await page.getByRole('textbox', { name: 'Search projects' }).fill('not-a-real-project')
  await expect(page.getByText('No projects found.')).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click()
  await page.getByRole('button', { name: 'hackathon', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.project-card')).toHaveCount(2)

  await page.getByRole('button', { name: 'Clear all', exact: true }).click()
  await page.getByRole('button', { name: 'discord', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(5)
})

async function fillContact(page) {
  await page.goto('/contact/')
  await page.getByLabel('Your name').fill('Portfolio test')
  await page.getByLabel('Email address').fill('test@example.com')
  await page.getByLabel('Subject', { exact: true }).fill('Test & verify')
  await page.getByLabel('Message', { exact: true }).fill('This is a local automated test, not a real submission.')
}

test('contact sends encoded fields and confirms only successful responses', async ({ page }) => {
  let submitted
  await page.route('**/__forms.html', async route => {
    submitted = new URLSearchParams(route.request().postData())
    await route.fulfill({ status: 200, body: 'OK' })
  })
  await fillContact(page)
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Message sent')
  expect(submitted.get('form-name')).toBe('contact')
  expect(submitted.get('email')).toBe('test@example.com')
  expect(submitted.get('subject')).toBe('Test & verify')
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue('')
})

test('failed contact submissions preserve the message and provide an email fallback', async ({ page }) => {
  await page.route('**/__forms.html', route => route.fulfill({ status: 503, body: 'Unavailable' }))
  await fillContact(page)
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Message couldn’t be sent')
  await expect(page.getByLabel('Message', { exact: true })).not.toHaveValue('')
  await expect(page.getByRole('link', { name: 'email me directly' })).toHaveAttribute('href', 'mailto:anshraj65@gmail.com')
})

test('reduced motion pauses the point cloud and image dialog supports Escape', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.field-stage')).toHaveAttribute('data-paused', 'true')
  await expect(page.locator('.field-stage canvas')).toBeVisible()
  await page.goto('/projects/taboo-party/')
  await page.getByRole('button', { name: 'Enlarge Taboo Party image' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
})

test('all content routes load and light theme remains usable', async ({ page }) => {
  for (const path of ['/about/', '/experience/', '/projects/givvy/', '/contact/thanks/']) {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.goto('/')
  await page.getByRole('button', { name: 'Toggle theme' }).first().click()
  await expect(page.locator('html')).toHaveClass(/light/)
  await page.screenshot({ path: `${SCREENSHOTS}/home-light.png` })
})

test('experience timeline follows scroll, filters by kind, and jumps from the ruler', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/experience/')
  const total = await page.locator('.work-entry').count()
  expect(total).toBeGreaterThanOrEqual(12)
  await expect(page.locator('.ruler-track button')).toHaveCount(total)
  await page.getByRole('button', { name: /^Wins/ }).click()
  await expect(page.locator('.work-entry:visible')).toHaveCount(await page.locator('.work-entry[data-kind="win"]').count())
  await page.getByRole('button', { name: /^Everything/ }).click()
  await expect(page.locator('.work-entry:visible')).toHaveCount(total)
  await page.getByRole('button', { name: 'Jump to Hyundai Mobis' }).click()
  await expect(page.locator('#milestone-hyundai')).toHaveAttribute('data-active', 'true')
  await expect(page.locator('#milestone-hyundai mark').first()).toBeVisible()
  await page.screenshot({ path: `${SCREENSHOTS}/experience-desktop.png` })
  await page.setViewportSize({ width: 390, height: 844 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: `${SCREENSHOTS}/experience-mobile.png`, fullPage: true })
  expect(errors).toEqual([])
})

test('headline shows live activity totals', async ({ page }) => {
  await serveStats(page)
  await page.goto('/')
  await page.locator('.impact-section').scrollIntoViewIfNeeded()
  await expect(page.locator('.impact-section')).toContainText('9.8K')
  await expect(page.locator('.impact-section')).toContainText('2.3K')
})

test('headline falls back when the feed is down', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await killStats(page)
  await page.goto('/')
  await page.locator('.impact-section').scrollIntoViewIfNeeded()
  await expect(page.locator('.impact-section')).toContainText('7.5K')
  await expect(page.locator('.impact-section')).toContainText('1.8K')
  expect(errors).toEqual([])
})

test('activities section lists every game', async ({ page }) => {
  await serveStats(page)
  await page.goto('/')
  const cards = page.locator('.activity-card')
  await expect(cards).toHaveCount(5)
  await expect(page.locator('.activity-badge')).toContainText('Live')
  for (const slug of ['taboo-party', 'thoughtmatch', 'tic-tac-toe', 'guess-the-district', 'cosmix']) {
    await expect(page.locator(`.activity-card a[href="/projects/${slug}/"]`)).toHaveCount(1)
  }
  const cosmix = cards.filter({ hasText: 'Cosmix' })
  await expect(cosmix).toContainText('Just launched')
  await expect(cosmix.locator('.activity-stat')).toHaveCount(0)
  await expect(cards.filter({ hasText: 'Taboo Party' }).locator('svg.sparkline')).toHaveCount(1)
})

test('activities section survives a dead feed', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await killStats(page)
  await page.goto('/')
  await expect(page.locator('.activity-card')).toHaveCount(5)
  await expect(page.locator('.activity-badge')).toContainText('Snapshot')
  expect(errors).toEqual([])
})

test('hides zero and null stats', async ({ page }) => {
  await serveStats(page)
  await page.goto('/')
  await expect(page.locator('.activity-badge')).toContainText('Live')
  const thoughtmatch = page.locator('.activity-card').filter({ hasText: 'ThoughtMatch' })
  await expect(thoughtmatch.locator('.activity-stat')).toHaveCount(3)
  await expect(thoughtmatch).not.toContainText('Discord installs')
  await expect(page.locator('.activity-stat strong', { hasText: /^0$/ })).toHaveCount(0)
})

test('live data does not shift the layout after first paint', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.route(STATS_URL, async route => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    await route.fulfill({ json: statsFixture(), headers: { 'access-control-allow-origin': '*' } })
  })
  await page.goto('/')
  await expect(page.locator('.activity-card')).toHaveCount(5)
  await expect(page.locator('.activity-section')).toBeVisible()
  await expect(page.locator('.activity-badge')).toContainText('Snapshot')
  const before = await page.locator('.activity-section').evaluate(element => element.getBoundingClientRect().top + scrollY)
  await expect(page.locator('.activity-badge')).toContainText('Live')
  const after = await page.locator('.activity-section').evaluate(element => element.getBoundingClientRect().top + scrollY)
  expect(after).toBe(before)
})

test('card titles stay on one line next to the Discord-only tag', async ({ page }) => {
  await killStats(page)
  await page.setViewportSize({ width: 800, height: 600 })
  await page.goto('/')
  const height = name => page.locator('.activity-card').filter({ hasText: name }).locator('h3').evaluate(element => element.getBoundingClientRect().height)
  expect(await height('Tic Tac Toe')).toBe(await height('Taboo Party'))
})

test('Taboo Party card shows site visits from its own counter', async ({ page }) => {
  await serveStats(page)
  await page.goto('/')
  await expect(page.locator('.activity-badge')).toContainText('Live')
  const taboo = page.locator('.activity-card').filter({ hasText: 'Taboo Party' })
  await expect(taboo.locator('.activity-stat').first()).toContainText('Site visits')
  await expect(taboo.locator('.activity-stat').first()).toContainText('80K')
  await expect(page.locator('.activity-card').filter({ hasText: 'ThoughtMatch' })).not.toContainText('Site visits')
})
