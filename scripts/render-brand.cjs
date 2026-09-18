const { chromium } = require('@playwright/test')
const SOCIAL_SIZE = { width: 1200, height: 630 }
const ICON_SIZE = { width: 512, height: 512 }
const RING_COUNT = 9
const RING_ANGLE = 20

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    const page = await browser.newPage({ viewport: SOCIAL_SIZE })
    const rings = Array.from({ length: RING_COUNT }, (_, index) => `<i style="transform:rotateY(${index * RING_ANGLE}deg)"></i>`).join('')
    await page.setContent(`<style>*{box-sizing:border-box}body{background:#080d17;color:#dce9ff;font-family:Arial,sans-serif;margin:0;padding:70px}header{font-size:22px;letter-spacing:-.5px}header span{color:#dca477}h1{font-weight:500;font-size:77px;line-height:1.05;letter-spacing:-4px;margin:65px 0 32px;position:relative;z-index:2}p{color:#99a8c0;font-size:21px}.scene{position:absolute;right:100px;top:175px;width:280px;height:280px;transform-style:preserve-3d;transform:rotateX(-20deg) rotateZ(-22deg) rotateY(30deg)}i{position:absolute;inset:0;border:2px solid #90b9f9;border-radius:50%;box-shadow:0 0 15px #5c8dd533}i:nth-child(3n){border-color:#dca477}footer{position:absolute;bottom:45px;font-size:17px;color:#dca477}</style><header>ansh<span>.</span> &nbsp; Ansh Raj Suryavanshi</header><h1>Intelligence.<br>Engineered for<br>the real world.</h1><p>Software Engineer / AI Engineer</p><div class="scene">${rings}</div><footer>Grand Blanc, MI &nbsp; / &nbsp; portfolio-anshlaw.netlify.app</footer>`)
    await page.screenshot({ path: 'public/og.png' })
    await page.setViewportSize(ICON_SIZE)
    await page.setContent('<style>body{margin:0;background:#080d17;color:#dce9ff;height:512px;display:grid;place-items:center;font:700 320px Arial;letter-spacing:-45px}span{color:#dca477}</style><div>a<span>.</span></div>')
    await page.screenshot({ path: 'public/icon.png' })
  } finally { await browser.close() }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
