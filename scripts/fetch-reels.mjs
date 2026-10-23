import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const reels = [
  { id: 'C2phJ92pJEZ', url: 'https://www.instagram.com/reel/C2phJ92pJEZ/' },
  { id: 'C34YbeoI0oq', url: 'https://www.instagram.com/reel/C34YbeoI0oq/' },
  { id: 'C43PVooJ0aM', url: 'https://www.instagram.com/reel/C43PVooJ0aM/' },
  { id: 'DXwzDzWzUwD', url: 'https://www.instagram.com/reel/DXwzDzWzUwD/' },
  { id: 'DQgmQuZkni8', url: 'https://www.instagram.com/reel/DQgmQuZkni8/' }
];

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    // If the url has byte range like &bytestart=...&byteend=..., strip that so we get the full video file!
    const cleanUrl = url.replace(/&bytestart=\d+&byteend=\d+/, '');
    const file = fs.createWriteStream(dest);
    https.get(cleanUrl, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`Failed with status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      if (fs.existsSync(dest)) fs.unlink(dest, () => reject(err));
      else reject(err);
    });
  });
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  for (const reel of reels) {
    const dest = path.resolve(`public/assets/instagram-reels/${reel.id}.mp4`);
    
    // Check if valid video already downloaded
    if (reel.id === 'C2phJ92pJEZ' || reel.id === 'C34YbeoI0oq' || reel.id === 'C43PVooJ0aM') {
      if (fs.existsSync(dest) && fs.statSync(dest).size > 1000000) {
        console.log(`${reel.id}.mp4 already valid (${fs.statSync(dest).size} bytes), skipping.`);
        continue;
      }
    }

    console.log(`Extracting video for ${reel.id}...`);
    let videoUrls = [];

    const onResponse = (res) => {
      const url = res.url();
      if (url.includes('.mp4') || (res.headers()['content-type'] || '').includes('video')) {
        let bitrate = 0;
        let isVideo = false;
        try {
          const urlObj = new URL(url);
          const efg = urlObj.searchParams.get('efg');
          if (efg) {
            const decoded = JSON.parse(Buffer.from(efg, 'base64').toString('utf8'));
            bitrate = decoded.bitrate || 0;
            if (decoded.vencode_tag && !decoded.vencode_tag.includes('audio')) {
              isVideo = true;
            }
          }
        } catch(e) {}
        videoUrls.push({ url, bitrate, isVideo });
      }
    };

    page.on('response', onResponse);

    try {
      await page.goto(reel.url, { waitUntil: 'networkidle2', timeout: 20000 });
      await page.evaluate(() => {
        const v = document.querySelector('video');
        if (v) v.play().catch(() => {});
      });
      await new Promise(r => setTimeout(r, 4000));
    } catch (e) {
      console.warn(`Nav warning for ${reel.id}: ${e.message}`);
    }

    page.off('response', onResponse);

    // Pick best video url
    videoUrls.sort((a, b) => b.bitrate - a.bitrate);
    const best = videoUrls.find(v => v.isVideo) || videoUrls[0];

    if (best && best.url) {
      console.log(`Downloading best video for ${reel.id} (bitrate: ${best.bitrate})...`);
      try {
        await downloadFile(best.url, dest);
        console.log(`Saved ${reel.id}.mp4 (${fs.statSync(dest).size} bytes)`);
      } catch (err) {
        console.error(`Download error for ${reel.id}: ${err.message}`);
      }
    } else {
      console.error(`No video URL found for ${reel.id}`);
    }
  }

  await browser.close();
  console.log('Reel extraction complete.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

