import https from 'https';
import fs from 'fs';

https.get('https://www.studio13.co.in/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const headerStart = data.indexOf('<x-header');
    const headerEnd = data.indexOf('</x-header>') + 11;
    fs.writeFileSync('scratch_header.html', data.substring(headerStart, headerEnd));

    const slideStart = data.indexOf('<slideshow-carousel');
    const slideEnd = data.indexOf('</slideshow-carousel>') + 21;
    fs.writeFileSync('scratch_slideshow.html', data.substring(slideStart, slideEnd));
    console.log('SUCCESS! Header and slideshow written.');
  });
});
