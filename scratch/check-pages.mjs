import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true
});

const page = await browser.newPage();
const consoleErrors = [];
page.on('console', msg => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', err => {
  consoleErrors.push(err.toString());
});

// Check our-story
await page.goto('http://localhost:5173/pages/our-story', { waitUntil: 'networkidle0' });
const storyImgs = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('img')).map(img => ({
    src: img.src,
    naturalWidth: img.naturalWidth,
    complete: img.complete
  }));
});

// Check services
await page.goto('http://localhost:5173/pages/services', { waitUntil: 'networkidle0' });
const servicesImgs = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('img')).map(img => ({
    src: img.src,
    naturalWidth: img.naturalWidth,
    complete: img.complete
  }));
});

console.log('Story images:', storyImgs);
console.log('Services images:', servicesImgs);
console.log('Console errors:', consoleErrors);

await browser.close();

