import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const outputDir = path.resolve('scratch/ui-test');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const routes = [
    { name: 'contact', url: 'http://localhost:5173/pages/contact' },
    { name: 'our-story', url: 'http://localhost:5173/pages/our-story' },
    { name: 'services', url: 'http://localhost:5173/pages/services' },
    { name: 'collections', url: 'http://localhost:5173/collections' },
    { name: 'home', url: 'http://localhost:5173/' }
  ];

  for (const route of routes) {
    console.log(`Testing ${route.name}...`);
    await page.goto(route.url, { waitUntil: 'networkidle0', timeout: 15000 });
    const screenshotPath = path.join(outputDir, `${route.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved screenshot: ${screenshotPath}`);

    if (route.name === 'contact') {
      const buttonStyles = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a')).filter(el => {
          const txt = el.textContent || '';
          return txt.includes('Nikita') || txt.includes('Instagram');
        });
        return buttons.map(b => {
          const style = window.getComputedStyle(b);
          return {
            text: b.textContent.trim(),
            tag: b.tagName,
            color: style.color,
            backgroundColor: style.backgroundColor,
            borderColor: style.borderColor,
            width: style.width,
            height: style.height
          };
        });
      });
      console.log('Contact button computed styles:', JSON.stringify(buttonStyles, null, 2));
    }
  }

  await browser.close();
  console.log('UI inspection complete.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

