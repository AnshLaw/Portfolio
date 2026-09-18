const { chromium } = require('@playwright/test')
const fs = require('node:fs/promises')

const VIEWPORT = { width: 1440, height: 900 }
const SCREENSHOT_QUALITY = 88
const LOAD_TIMEOUT_MS = 45_000
const liveProjects = [
  ['taboo-party', 'https://tabooparty.online'],
  ['rec-it-app', 'https://kurecit.netlify.app/signin'],
  ['gigs-for-pi', 'https://gigsforpilive.netlify.app'],
  ['songchat', 'https://songchat.online'],
]

async function captureLive(browser, slug, url) {
  const page = await browser.newPage({ viewport: VIEWPORT, reducedMotion: 'reduce' })
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: LOAD_TIMEOUT_MS })
    if (slug === 'taboo-party' && await page.getByRole('button', { name: 'Yes', exact: true }).isVisible()) {
      await page.getByRole('button', { name: 'Yes', exact: true }).click()
      await page.getByRole('heading', { name: /taboo/i }).first().waitFor()
    }
    await page.screenshot({ path: `public/projects/${slug}.jpg`, type: 'jpeg', quality: SCREENSHOT_QUALITY })
    console.log(`Captured ${slug}: ${await page.title()}`)
  } finally { await page.close() }
}

const concepts = [
  { slug: 'llm-reasoning-system', title: 'Intelligence, on board.', subtitle: 'Local reasoning. Context-aware comfort.', tone: '#8fbdff', body: '<div class="flow"><div class="sensor">Cabin sensors<span>Vision / audio / environment</span></div><i></i><div class="brain">Local LLM<span>Agentic RAG</span><b>◎</b></div><i></i><div class="sensor">Comfort & media<span>Context-aware recommendations</span></div></div><div class="bottom">On-device inference <em>Python + Ollama</em> Cruden Simulator</div>' },
  { slug: 'givvy', title: 'A little card. A bigger idea.', subtitle: 'Encrypted NFC gifting, reimagined.', tone: '#e6b88a', body: '<div class="gift-layout"><div class="gift-card"><strong>givvy<span>◉</span></strong><div class="eink">Something<br>just for you.<small>Tap to unwrap your gift.</small></div><p>NFC + E-ink</p></div><div class="gift-notes"><h2>A gift worth<br>keeping.</h2><p>AES encryption<br>Connected point of sale<br>TypeScript + Supabase</p><b>Hack Dearborn 2025 winner</b></div></div>' },
  { slug: 'transcripto-app', title: 'From listening to learning.', subtitle: 'Audio in. Understanding out.', tone: '#baa8f7', body: '<div class="audio-wave">'+Array.from({length:42},(_,i)=>`<span style="height:${28 + Math.abs(Math.sin(i * .7)) * 95}px"></span>`).join('')+'</div><div class="study-grid"><div><b>01</b><h2>Transcribe</h2><p>Audio & video to text</p></div><div><b>02</b><h2>Summarize</h2><p>The ideas that matter</p></div><div><b>03</b><h2>Study</h2><p>Quizzes & flashcards</p></div></div>' },
  { slug: 'road-entertainment-system', title: 'The right soundtrack.<br>For every journey.', subtitle: 'Route-aware, personalized entertainment.', tone: '#89d2b5', body: '<div class="road-layout"><div class="road"><div class="route"></div><span class="pin start">A</span><span class="pin end">B</span><div class="car">▰</div></div><div class="route-info"><span>Trip context → Media recommendations</span><h2>89%</h2><p>Recommendation accuracy</p><div>Google Maps + Gesture recognition</div><b>Hack Dearborn 2023 winner</b></div></div>' },
]

const styles = `*{box-sizing:border-box}body{margin:0;background:#101b2b;color:#e9f0fc;font-family:Arial,sans-serif;padding:65px 80px;width:1440px;height:900px;overflow:hidden;background-image:radial-gradient(ellipse at 70% 30%,color-mix(in srgb,var(--tone) 10%,transparent),transparent 60%)}header{display:flex;justify-content:space-between;align-items:center;font-size:15px;color:var(--tone)}header span:last-child{color:#90a0b8;border:1px solid #344058;padding:9px 14px;border-radius:30px}h1{font-size:60px;letter-spacing:-2px;font-weight:500;margin:65px 0 18px;line-height:1.08}p{color:#a9b9d0;font-size:21px;line-height:1.7}header+h1+p{margin-bottom:50px}.flow{display:flex;align-items:center;justify-content:center;margin-top:80px}.sensor,.brain{padding:36px 26px;border:1px solid #415577;border-radius:16px;background:#17263c;font-size:22px;text-align:center}.sensor span,.brain span{display:block;font-size:14px;color:#a6b5cf;margin-top:15px}.brain{width:290px;border-color:var(--tone);box-shadow:0 0 90px #8fbdff19}.brain b{display:block;font-size:60px;font-weight:400;color:var(--tone);margin-top:22px}.flow i{width:65px;height:1px;background:var(--tone)}.bottom{display:flex;justify-content:space-between;margin-top:90px;color:#a9b9d0;font-size:17px}.bottom em{font-style:normal;color:var(--tone)}.gift-layout{display:flex;gap:110px;align-items:center;margin:45px 60px}.gift-card{background:#e7dfd2;color:#192439;border-radius:22px;width:420px;min-height:320px;transform:rotate(-9deg);padding:30px;box-shadow:18px 25px 0 #0003,0 40px 80px #0005}.gift-card strong{font-size:36px;letter-spacing:-2px}.gift-card strong span{float:right;font-size:30px}.eink{border:1px solid #9b9b94;border-radius:7px;margin-top:22px;padding:22px;font-size:32px;background:#c9ccc0;line-height:1.15}.eink small{font-size:13px;display:block;margin-top:22px}.gift-card p{font-size:12px;margin-bottom:0;color:#44505d}.gift-notes h2{font-size:43px;font-weight:400;letter-spacing:-1px}.gift-notes p{font-size:19px}.gift-notes b,.route-info b{font-size:15px;color:var(--tone);font-weight:400}.audio-wave{display:flex;align-items:center;gap:9px;height:150px;justify-content:center;margin:70px 0 50px}.audio-wave span{width:12px;background:linear-gradient(var(--tone),#6570a2);border-radius:10px}.study-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:25px}.study-grid>div{border-top:1px solid #445174;padding-top:25px}.study-grid b{color:var(--tone);font-weight:400;font-size:15px}.study-grid h2{font-weight:400;font-size:27px}.study-grid p{font-size:17px}.road-layout{display:flex;gap:90px;align-items:center}.road{width:490px;height:300px;background:repeating-linear-gradient(0deg,transparent,transparent 38px,#819bb010 39px,#819bb010 40px),repeating-linear-gradient(90deg,transparent,transparent 38px,#819bb010 39px,#819bb010 40px);position:relative}.route{position:absolute;top:55px;left:65px;width:350px;height:185px;border:9px solid var(--tone);border-left:0;border-radius:0 80px 80px 0;box-shadow:15px 0 50px #89d2b515}.pin{position:absolute;width:33px;height:33px;display:grid;place-items:center;border-radius:50%;background:var(--tone);color:#152435;font-size:15px}.start{top:43px;left:45px}.end{top:218px;left:45px}.car{position:absolute;left:365px;top:112px;font-size:45px;color:#eaf8f5;transform:rotate(90deg)}.route-info span{font-size:15px;color:#a9b9d0}.route-info h2{font-size:85px;color:var(--tone);font-weight:400;letter-spacing:-5px;margin:20px 0 0}.route-info p{font-size:18px;margin:0 0 30px}.route-info div{font-size:14px;margin-bottom:26px;color:#a9b9d0}`

async function captureConcept(browser, concept) {
  const page = await browser.newPage({ viewport: VIEWPORT })
  try {
    await page.setContent(`<html><head><style>${styles}</style></head><body style="--tone:${concept.tone}"><header><span>${concept.slug === 'llm-reasoning-system' ? 'In-cabin AI comfort system' : concept.slug.replaceAll('-', ' ')}</span><span>Project concept illustration</span></header><h1>${concept.title}</h1><p>${concept.subtitle}</p>${concept.body}</body></html>`)
    await page.screenshot({ path: `public/projects/${concept.slug}.jpg`, type: 'jpeg', quality: SCREENSHOT_QUALITY })
  } finally { await page.close() }
}

async function main() {
  await fs.mkdir('public/projects', { recursive: true })
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    for (const [slug, url] of liveProjects.filter(([slug]) => !process.argv[2] || slug === process.argv[2])) await captureLive(browser, slug, url)
    for (const concept of concepts) await captureConcept(browser, concept)
  } finally { await browser.close() }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
