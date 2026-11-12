const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

function readModule(path, globals = {}) {
  const source = fs.readFileSync(path, 'utf8')
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } })
  const context = { exports: {}, AbortSignal, ...globals }
  vm.runInNewContext(output.outputText, context)
  return context.exports
}

const lib = readModule('lib/activity-stats.ts')
const { FALLBACK_STATS } = readModule('data/activity-stats-fallback.ts')
const clone = value => JSON.parse(JSON.stringify(value))

function liveFixture() {
  const live = clone(FALLBACK_STATS)
  live.generatedAt = '2026-11-13T00:00:00Z'
  live.total.games.allTime = 9876
  live.apps = [{ ...live.apps.find(app => app.id === 'taboo'), games: { d7: 1, d30: 2, allTime: 5000 } }]
  return live
}

test('formatCompact rounds down to one decimal and never overstates', () => {
  const cases = [[7546, '7.5K'], [1814, '1.8K'], [374, '374'], [52100, '52.1K'], [1000, '1K'], [1_250_000, '1.2M'], [999, '999'], [0, '0']]
  for (const [input, expected] of cases) assert.equal(lib.formatCompact(input), expected, String(input))
})

test('parseActivityStats rejects malformed payloads', () => {
  for (const bad of [null, '<html>', {}, { apps: 'x' }, 42]) assert.equal(lib.parseActivityStats(bad), null, JSON.stringify(bad))
  const negative = clone(FALLBACK_STATS)
  negative.total.games.allTime = -1
  assert.equal(lib.parseActivityStats(negative), null)
  const notNumber = clone(FALLBACK_STATS)
  notNumber.apps[0].players.d7 = 'many'
  assert.equal(lib.parseActivityStats(notNumber), null)
})

test('parseActivityStats accepts a valid feed and drops unknown apps', () => {
  const feed = clone(FALLBACK_STATS)
  feed.apps.push({ ...clone(feed.apps[0]), id: 'brand-new-game', name: 'New' })
  const parsed = lib.parseActivityStats(feed)
  assert.ok(parsed)
  assert.equal(parsed.apps.length, FALLBACK_STATS.apps.length)
  assert.ok(!parsed.apps.some(app => app.id === 'brand-new-game'))
})

test('mergeStats keeps the fallback for anything live data lacks', () => {
  assert.deepEqual(lib.mergeStats(FALLBACK_STATS, null), FALLBACK_STATS)
  const merged = lib.mergeStats(FALLBACK_STATS, liveFixture())
  assert.equal(merged.total.games.allTime, 9876)
  assert.equal(merged.generatedAt, '2026-11-13T00:00:00Z')
  assert.equal(merged.apps.length, 5)
  assert.equal(merged.apps.find(app => app.id === 'taboo').games.allTime, 5000)
  assert.deepEqual(merged.apps.find(app => app.id === 'tictactoe'), FALLBACK_STATS.apps.find(app => app.id === 'tictactoe'))
})

test('fetchActivityStats resolves null instead of throwing on any failure', async () => {
  const rejecting = async () => { throw new Error('offline') }
  const serverError = async () => ({ ok: false, status: 500, json: async () => ({}) })
  const notJson = async () => ({ ok: true, status: 200, json: async () => { throw new SyntaxError('Unexpected token <') } })
  for (const fetchImpl of [rejecting, serverError, notJson]) assert.equal(await lib.fetchActivityStats(fetchImpl), null)
  const good = async () => ({ ok: true, status: 200, json: async () => clone(FALLBACK_STATS) })
  assert.equal((await lib.fetchActivityStats(good)).apps.length, 5)
})

test('fallback snapshot matches the public feed read at 2026-11-12 22:15 UTC', () => {
  assert.equal(FALLBACK_STATS.total.games.allTime, 7682)
  assert.equal(FALLBACK_STATS.total.players.allTime, 4458)
  assert.equal(FALLBACK_STATS.apps.find(app => app.id === 'taboo').players.allTime, 2988)
  assert.deepEqual(clone(FALLBACK_STATS.apps.map(app => app.id)), ['taboo', 'thoughtmatch', 'tictactoe', 'guessthedistrict', 'amalgummy'])
  assert.equal(FALLBACK_STATS.apps.find(app => app.id === 'amalgummy').games.allTime, 12)
  assert.ok(lib.parseActivityStats(FALLBACK_STATS))
  for (const id of Object.keys(lib.APP_SLUGS)) assert.ok(FALLBACK_STATS.apps.some(app => app.id === id), id)
})

test('parseActivityStats reads site visits and treats a missing field as unknown', () => {
  const feed = clone(FALLBACK_STATS)
  feed.apps[0].visits = 80000
  assert.equal(lib.parseActivityStats(feed).apps[0].visits, 80000)
  for (const app of feed.apps) delete app.visits
  delete feed.total.visits
  const legacy = lib.parseActivityStats(feed)
  assert.ok(legacy)
  assert.equal(legacy.apps[0].visits, null)
  assert.equal(legacy.total.visits, null)
  const negative = clone(FALLBACK_STATS)
  negative.apps[0].visits = -1
  assert.equal(lib.parseActivityStats(negative), null)
})

test('fallback carries Taboo Party site visits only', () => {
  assert.equal(FALLBACK_STATS.apps.find(app => app.id === 'taboo').visits, 71736)
  assert.equal(FALLBACK_STATS.total.visits, 71736)
  for (const app of FALLBACK_STATS.apps.filter(app => app.id !== 'taboo')) assert.equal(app.visits, null, app.id)
})
