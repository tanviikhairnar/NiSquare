import fs from 'node:fs';
import path from 'node:path';

const targetDir = 'public/assets/videos/hero';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const mappings = [
  { from: 'public/assets/instagram-reels/C2phJ92pJEZ.mp4', to: 'trousseau-curation.mp4' },
  { from: 'public/assets/instagram-reels/DXwzDzWzUwD.mp4', to: 'personalised-gifting.mp4' },
  { from: 'public/assets/videos/catalog/baby-hampers-120cb4d52e074692b760f1c76ffba7be.mp4', to: 'baby-celebrations.mp4' },
  { from: 'public/assets/instagram-reels/C43PVooJ0aM.mp4', to: 'wedding-favours.mp4' },
  { from: 'public/assets/instagram-reels/DQgmQuZkni8.mp4', to: 'bridesmaid-curation.mp4' },
  { from: 'public/assets/videos/catalog/ring-platters-5a992c14103f4f6cb19b758453c6f9d2.mp4', to: 'ring-platters.mp4' },
  { from: 'public/assets/videos/catalog/corporate-gifting-hampers-0ab7f7ca0bbd4cc5a1d10f671f553f08.mp4', to: 'corporate-hampers.mp4' },
  { from: 'public/assets/videos/catalog/trousseau-06c16b795a324cf6ba0314d4194be0e6.mp4', to: 'trousseau-luxury-trunk.mp4' },
];

for (const m of mappings) {
  if (fs.existsSync(m.from)) {
    const dest = path.join(targetDir, m.to);
    fs.copyFileSync(m.from, dest);
    const sz = (fs.statSync(dest).size / (1024 * 1024)).toFixed(1);
    console.log(`Copied ${m.to} (${sz} MB)`);
  } else {
    console.error(`Missing ${m.from}`);
  }
}

