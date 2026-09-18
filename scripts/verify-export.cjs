const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert/strict')
const EXPORT_DIRECTORY = 'out'
const REFERENCE_PATTERN = /(?:src|href)="(\/[^"#?]*)(?:[^\"]*)"/g

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name)
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith('.html') ? [file] : []
  })
}

const files = htmlFiles(EXPORT_DIRECTORY)
const missing = new Set()
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8')
  for (const match of html.matchAll(REFERENCE_PATTERN)) {
    const reference = decodeURIComponent(match[1])
    if (reference.startsWith('//')) continue
    const target = path.join(EXPORT_DIRECTORY, reference)
    if (!fs.existsSync(target) && !fs.existsSync(path.join(target, 'index.html'))) missing.add(`${file}: ${reference}`)
  }
}
assert.equal(missing.size, 0, [...missing].join('\n'))
const contact = fs.readFileSync('out/contact/index.html', 'utf8')
assert.match(contact, /name="contact"/)
assert.match(contact, /data-netlify="true"/)
assert.ok(fs.existsSync('out/__forms.html'))
assert.ok(fs.existsSync('out/contact/thanks/index.html'))
console.log(`Verified internal links and assets across ${files.length} exported HTML files; static Netlify form is present.`)
