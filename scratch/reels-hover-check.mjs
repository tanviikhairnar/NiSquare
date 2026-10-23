import puppeteer from 'puppeteer-core';
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

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 20000 });

  // Scroll to previous-work-section
  await page.evaluate(() => {
    const el = document.querySelector('.previous-work-section');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));

  const cards = await page.$$('.previous-work-card');
  console.log(`Found ${cards.length} reel cards`);

  // Hover over card 1
  console.log('Hovering over card 1...');
  await cards[0].hover();
  await new Promise(r => setTimeout(r, 2000)); // let video play for 2s

  const card1Status = await page.evaluate(() => {
    const v = document.querySelectorAll('.previous-work-card video')[0];
    return {
      paused: v ? v.paused : null,
      currentTime: v ? v.currentTime : null,
      videoWidth: v ? v.videoWidth : null,
      src: v ? v.src : null
    };
  });
  console.log('Card 1 status during hover:', card1Status);

  const screenshotPath1 = path.resolve('scratch/ui-test/reels-hover-card1.png');
  await page.screenshot({ path: screenshotPath1 });
  console.log('Saved screenshot of card 1 hover:', screenshotPath1);

  // Unhover card 1 (move mouse to heading)
  await page.hover('.previous-work-eyebrow');
  await new Promise(r => setTimeout(r, 500));

  const card1AfterUnhover = await page.evaluate(() => {
    const v = document.querySelectorAll('.previous-work-card video')[0];
    return {
      paused: v ? v.paused : null,
      currentTime: v ? v.currentTime : null
    };
  });
  console.log('Card 1 status after unhover:', card1AfterUnhover);

  // Hover over card 2
  console.log('Hovering over card 2...');
  await cards[1].hover();
  await new Promise(r => setTimeout(r, 2000)); // let video play for 2s

  const card2Status = await page.evaluate(() => {
    const v = document.querySelectorAll('.previous-work-card video')[1];
    return {
      paused: v ? v.paused : null,
      currentTime: v ? v.currentTime : null,
      videoWidth: v ? v.videoWidth : null
    };
  });
  console.log('Card 2 status during hover:', card2Status);

  const screenshotPath2 = path.resolve('scratch/ui-test/reels-hover-card2.png');
  await page.screenshot({ path: screenshotPath2 });
  console.log('Saved screenshot of card 2 hover:', screenshotPath2);

  await browser.close();
  console.log('Test completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
