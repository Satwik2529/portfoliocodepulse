import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = 'C:/Users/satwi/AppData/Local/Temp/claude/c--Users-satwi-OneDrive-Desktop-portfolio/26d3f676-f93d-44bd-93f5-2cb02f9221cf/scratchpad/shots11';
mkdirSync(OUT, { recursive: true });

const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto('http://localhost:5199', { waitUntil: 'networkidle' });
await page.evaluate(() => {
  const el = document.querySelector('#about');
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'instant' });
});
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/about-redesign.png` });

// Check live demo links
await page.evaluate(() => {
  const el = document.querySelector('#projects');
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'instant' });
});
await page.waitForTimeout(600);
const liveLinks = await page.locator('a:has-text("Live")').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
console.log('Live demo links found:', JSON.stringify(liveLinks));

// Contact form check (no env gating now, should always render)
await page.evaluate(() => {
  const el = document.querySelector('#contact');
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'instant' });
});
await page.waitForTimeout(600);
const formCount = await page.locator('form').count();
console.log('Contact form present:', formCount === 1);
await page.screenshot({ path: `${OUT}/contact-formsubmit.png` });

console.log('Errors:', errors.length ? errors.join(' | ') : '(none)');
await browser.close();
