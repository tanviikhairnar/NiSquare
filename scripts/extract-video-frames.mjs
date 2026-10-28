import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\tanvi\\.gemini\\antigravity\\brain\\0c706edb-ff32-4a09-9d72-b1dce15e8550\\video_frames';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const videos = [
  { name: 'IMG_1042', path: 'public/assets/images/Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Trousseau/IMG_1042.MOV' },
  { name: 'IMG_1044', path: 'public/assets/images/Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Trousseau/IMG_1044.MOV' },
  { name: 'IMG_1172', path: 'public/assets/images/IMG_1172.mov' },
  { name: 'IMG_4534', path: 'public/assets/images/IMG_4534.mov' },
  { name: 'IMG_4549', path: 'public/assets/images/IMG_4549.mov' },
  { name: 'IMG_4853', path: 'public/assets/images/IMG_4853.mov' },
  { name: 'IMG_3737', path: 'public/assets/images/Return favours-20261027T173440Z-1-001/Return favours/Wedding Return Favours/IMG_3737.MOV' },
  { name: 'IMG_3742', path: 'public/assets/images/Return favours-20261027T173440Z-1-001/Return favours/Wedding Return Favours/IMG_3742.MOV' },
  { name: 'IMG_5831', path: 'public/assets/images/Return favours-20261027T173440Z-1-001/Return favours/Wedding Return Favours/IMG_5831.MOV' },
  { name: 'IMG_5834', path: 'public/assets/images/Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Room Hampers/IMG_5834.MOV' },
];

async function run() {
  const tmpUserDir = path.join(outDir, 'puppeteer_profile_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: tmpUserDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  for (const v of videos) {
    if (!fs.existsSync(v.path)) {
      console.log('Skipping missing:', v.path);
      continue;
    }
    const absPath = path.resolve(v.path).replace(/\\/g, '/');
    const fileUrl = 'file:///' + absPath;
    console.log(`Processing ${v.name}...`);

    const html = `
      <!DOCTYPE html>
      <html>
      <body style="margin:0; background:black; display:flex; align-items:center; justify-content:center; width:100vw; height:100vh;">
        <video id="vid" src="${fileUrl}" muted autoplay playsinline style="width:100%; height:100%; object-fit:contain;"></video>
      </body>
      </html>
    `;
    await page.setContent(html);

    // Wait for video to load and seek to 2 seconds
    await page.evaluate(() => {
      return new Promise((resolve) => {
        const vid = document.getElementById('vid');
        vid.onloadeddata = () => {
          vid.currentTime = Math.min(2.0, (vid.duration || 4) / 2);
        };
        vid.onseeked = () => resolve();
        setTimeout(resolve, 3500); // fallback timeout
      });
    });

    const outPath = path.join(outDir, `${v.name}_frame.jpg`);
    await page.screenshot({ path: outPath, quality: 90, type: 'jpeg' });
    console.log(`Saved frame: ${outPath}`);
  }

  await browser.close();
  try { fs.rmSync(tmpUserDir, { recursive: true, force: true }); } catch (e) {}
  console.log('Frame extraction complete!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

