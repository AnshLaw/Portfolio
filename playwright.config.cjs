const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './tests/browser',
  timeout: 30_000,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4173', channel: 'chrome', headless: true },
  webServer: { command: 'python -m http.server 4173 --bind 127.0.0.1 --directory out', url: 'http://127.0.0.1:4173', reuseExistingServer: true, stdout: 'ignore', stderr: 'ignore' },
  reporter: 'list',
})
