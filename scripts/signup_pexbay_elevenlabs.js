// Playwright-based signup helper (semi-automated).
// NOTE: Many providers use CAPTCHA/email verification; this script will stop at those steps.
// Usage: node scripts/signup_pexbay_elevenlabs.js --provider pexels|pixabay|elevenlabs --email ...

const { chromium } = require('playwright');

function arg(name, def=null){
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i+1] : def;
}

const provider = arg('provider');
const email = arg('email');
const password = arg('password');

if(!provider || !email || !password){
  console.error('Missing args: --provider --email --password');
  process.exit(2);
}

const urls = {
  pexels: 'https://www.pexels.com/join/',
  pixabay: 'https://pixabay.com/accounts/register/',
  elevenlabs: 'https://elevenlabs.io/app/sign-up',
};

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(urls[provider], { waitUntil: 'domcontentloaded', timeout: 60000 });

  console.log(`[signup] opened ${provider} at ${page.url()}`);
  console.log('[signup] You may need to complete CAPTCHA / email verification manually.');

  if(provider === 'pexels'){
    // Fill basic fields if present
    const emailSel = 'input[type="email"], input[name="email"]';
    const passSel = 'input[type="password"], input[name="password"]';
    if(await page.locator(emailSel).count()) await page.locator(emailSel).first().fill(email);
    if(await page.locator(passSel).count()) await page.locator(passSel).first().fill(password);
  }

  if(provider === 'pixabay'){
    const emailSel = 'input[type="email"], input[name="email"]';
    const passSel = 'input[type="password"], input[name="password"]';
    if(await page.locator(emailSel).count()) await page.locator(emailSel).first().fill(email);
    if(await page.locator(passSel).count()) await page.locator(passSel).first().fill(password);
  }

  if(provider === 'elevenlabs'){
    const emailSel = 'input[type="email"], input[name="email"]';
    const passSel = 'input[type="password"], input[name="password"]';
    if(await page.locator(emailSel).count()) await page.locator(emailSel).first().fill(email);
    if(await page.locator(passSel).count()) await page.locator(passSel).first().fill(password);
  }

  console.log('[signup] Browser is open. Finish the signup in the window, then press Enter here to close.');
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', async () => {
    await browser.close();
    process.exit(0);
  });
})();
