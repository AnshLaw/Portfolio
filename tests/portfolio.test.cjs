const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

function readModule(path, globals = {}) {
  const source = fs.readFileSync(path, 'utf8')
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } })
  const context = { exports: {}, URLSearchParams, ...globals }
  vm.runInNewContext(output.outputText, context)
  return context.exports
}

test('profile matches the latest resume and retains all original projects', () => {
  const { profile, projects, experience } = readModule('data/portfolio.ts')
  assert.equal(profile.location, 'Grand Blanc, MI')
  assert.equal(experience[0].company, 'General Motors')
  assert.equal(experience[0].end, 'Present')
  for (const slug of ['llm-reasoning-system', 'road-entertainment-system', 'rec-it-app', 'transcripto-app', 'gigs-for-pi', 'songchat']) {
    assert.ok(projects.some(project => project.slug === slug), slug)
  }
  const taboo = projects.find(project => project.slug === 'taboo-party')
  assert.equal(taboo.liveUrl, 'https://tabooparty.online')
  assert.ok(taboo.links.some(link => link.url === 'https://discord.com/discovery/applications/1468756639938252891'))
  assert.ok(taboo.links.some(link => link.url === 'https://discord.com/invite/hemVkeHYmM'))
  for (const project of projects) assert.notEqual(project.repoUrl, 'https://github.com/AnshLaw')
})

test('message submission encodes fields and includes Netlify form identity', async () => {
  let request
  const fetch = async (url, options) => { request = { url, ...options }; return { ok: true } }
  const { submitContact } = readModule('lib/contact.ts', { fetch, AbortSignal })
  await submitContact(new Map([['name', 'Ansh & team'], ['email', 'reply@example.com'], ['message', 'Hello + world']]))
  const fields = new URLSearchParams(request.body)
  assert.equal(request.method, 'POST')
  assert.equal(fields.get('form-name'), 'contact')
  assert.equal(fields.get('name'), 'Ansh & team')
  assert.equal(fields.get('email'), 'reply@example.com')
  assert.equal(fields.get('message'), 'Hello + world')
})

test('message submission rejects server failure and network failure', async () => {
  for (const fetch of [async () => ({ ok: false }), async () => { throw Error('Offline') }]) {
    const { submitContact } = readModule('lib/contact.ts', { fetch, AbortSignal })
    await assert.rejects(submitContact(new Map([['email', 'reply@example.com']])))
  }
})

test('project images and the current resume exist locally', () => {
  const { profile, projects } = readModule('data/portfolio.ts')
  assert.ok(fs.existsSync(`public${profile.resumeUrl}`))
  for (const project of projects) {
    for (const image of project.images) assert.ok(fs.existsSync(`public${image.src}`), image.src)
  }
})

test('Netlify registers all contact fields and preserves a native success route', () => {
  const html = fs.readFileSync('public/__forms.html', 'utf8')
  assert.match(html, /data-netlify="true"/)
  assert.match(html, /netlify-honeypot="bot-field"/)
  assert.match(html, /action="\/contact\/thanks\/"/)
  for (const name of ['form-name', 'bot-field', 'name', 'email', 'subject', 'message']) {
    assert.ok(html.includes(`name="${name}"`), name)
  }
  assert.match(html, /type="email" name="email"/)
})

test('timeline parses resume dates, measures tenure, and stacks overlapping roles', () => {
  const { parseMonth, monthSpan, formatTenure, assignLanes } = readModule('lib/timeline.ts')
  const now = { year: 2026, month: 8 }
  assert.deepEqual({ ...parseMonth('Oct 2022', now) }, { year: 2022, month: 9 })
  assert.deepEqual({ ...parseMonth('Present', now) }, now)
  assert.equal(monthSpan('Oct 2022', 'Jun 2025', now), 33)
  assert.equal(formatTenure(33), '2 yr 9 mo')
  assert.equal(formatTenure(1), '1 mo')
  assert.equal(formatTenure(12), '1 yr')
  const lanes = assignLanes([{ start: 'Mar 2026', end: 'Present' }, { start: 'Oct 2022', end: 'Jun 2025' }, { start: 'Oct 2023', end: 'Oct 2023' }], now)
  assert.deepEqual([...lanes], [0, 0, 1])
})

test('timeline highlights metrics but not calendar years', () => {
  const { splitMetrics } = readModule('lib/timeline.ts')
  const parts = splitMetrics('Cut setup from 5-6 weeks to 2-3 days, 35% faster, shown at CES 2023 for 5M+ vehicles by 2025.')
  assert.deepEqual([...parts.filter(part => part.metric).map(part => part.text)], ['5-6', '2-3', '35%', '5M+'])
  assert.equal(parts.map(part => part.text).join(''), 'Cut setup from 5-6 weeks to 2-3 days, 35% faster, shown at CES 2023 for 5M+ vehicles by 2025.')
})

test('timeline covers roles, study, projects, and wins newest-first without treating hackathons as roles', () => {
  const { experience, milestones, projects } = readModule('data/portfolio.ts')
  const { parseMonth, toIndex } = readModule('lib/timeline.ts')
  const now = { year: 2026, month: 8 }
  assert.ok(experience.every(job => !/hack/i.test(job.company)))
  assert.deepEqual([...new Set(milestones.map(item => item.kind))].sort(), ['project', 'study', 'win', 'work'])
  for (const title of ['General Motors', 'Hyundai Mobis', 'Taboo Party', 'Givvy', 'MEDC', 'CES 2023', 'Kettering']) {
    assert.ok(milestones.some(item => `${item.title} ${item.org}`.includes(title)), title)
  }
  const starts = [...milestones.map(item => toIndex(parseMonth(item.start, now)))]
  assert.deepEqual(starts, [...starts].sort((first, second) => second - first))
  for (const item of milestones.filter(item => item.href?.startsWith('/projects/'))) {
    assert.ok(projects.some(project => item.href === `/projects/${project.slug}/`), item.href)
  }
  assert.equal(new Set(milestones.map(item => item.id)).size, milestones.length)
})

test('year-only dates sit mid-year', () => {
  const { parseMonth } = readModule('lib/timeline.ts')
  assert.deepEqual({ ...parseMonth('2023', { year: 2026, month: 8 }) }, { year: 2023, month: 6 })
})

test('numbers inside words are not treated as metrics', () => {
  const { splitMetrics } = readModule('lib/timeline.ts')
  assert.deepEqual([...splitMetrics('A Web3 app with 20,000+ likes').filter(part => part.metric).map(part => part.text)], ['20,000+'])
})

test('season dates sit in the middle of the season', () => {
  const { parseMonth } = readModule('lib/timeline.ts')
  const now = { year: 2026, month: 8 }
  assert.deepEqual({ ...parseMonth('Fall 2024', now) }, { year: 2024, month: 9 })
  assert.deepEqual({ ...parseMonth('Summer 2025', now) }, { year: 2025, month: 6 })
})

test('scholarship is two awards and every project with dates is on the timeline', () => {
  const { milestones, projects } = readModule('data/portfolio.ts')
  const scholarships = milestones.filter(item => /Michiganders/.test(item.title))
  assert.deepEqual([...scholarships.map(item => item.start)], ['Summer 2025', 'Fall 2024'])
  assert.ok(!milestones.some(item => item.start === '2023'))
  for (const slug of ['transcripto-app', 'songchat']) {
    assert.ok(projects.find(project => project.slug === slug).period, slug)
    assert.ok(milestones.some(item => item.href === `/projects/${slug}/`), slug)
  }
})
