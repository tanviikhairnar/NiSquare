import puppeteer from 'puppeteer-core';
import path from 'node:path';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:5173/pages/contact', { waitUntil: 'networkidle0' });

const buttons = await page.$$('section .store-page-inner .grid button, section .store-page-inner .grid a');
console.log(`Found ${buttons.length} contact action buttons`);

for (let i = 0; i < buttons.length; i++) {
  const btn = buttons[i];
  await btn.hover();
  await new Promise(r => setTimeout(r, 400)); // wait for transition
  const hoverStyles = await page.evaluate(el => {
    const s = window.getComputedStyle(el);
    return {
      text: el.textContent.trim(),
      color: s.color,
      backgroundColor: s.backgroundColor,
      borderColor: s.borderColor,
      transform: s.transform
    };
  }, btn);
  console.log(`Button ${i + 1} Hover Styles:`, hoverStyles);
}

await page.screenshot({ path: path.resolve('scratch/ui-test/contact-hover.png') });
await browser.close();
