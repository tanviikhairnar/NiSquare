import fs from 'fs';

const data = fs.readFileSync('scratch_full.html', 'utf8');
const headerStart = data.indexOf('<x-header');
const headerEnd = data.indexOf('</x-header>', headerStart) + 11;
fs.writeFileSync('scratch_header.html', data.substring(headerStart, headerEnd));

const slideStart = data.indexOf('<slideshow-carousel');
const slideEnd = data.indexOf('</slideshow-carousel>', slideStart) + 21;
fs.writeFileSync('scratch_slideshow.html', data.substring(slideStart, slideEnd));
console.log('Extracted! header len:', headerEnd - headerStart, 'slide len:', slideEnd - slideStart);
