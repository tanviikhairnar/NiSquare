
const studioImage = (file, query) =>
  `https://www.studio13.co.in/cdn/shop/files/${file}?v=${query}`;

export const topPicks = [
  { id: 'safari-dinner', name: 'Safari Dinner Set for Children', price: 3350, compareAt: 3565, rating: '4.8', image: studioImage('ds04.jpg', '1691328806&width=936'), secondaryImage: studioImage('ds03.jpg', '1691328806&width=936'), images: [studioImage('ds04.jpg', '1691328806&width=936'), studioImage('ds03.jpg', '1691328806&width=936'), studioImage('ds02.jpg', '1691328806&width=936'), studioImage('DS01.jpg', '1691328806&width=936')], href: '/products/safari-dinner-set-for-children' },
  { id: 'solar-system', name: "Solar System Children's Dinner Set", price: 3350, rating: '4.8', image: studioImage('boxsolar.jpg', '1709202173&width=3024'), secondaryImage: studioImage('boxsolar4.jpg', '1709202175&width=3024'), href: '/products/solar-system-childrens-dinner-set' },
  { id: 'wild-safari', name: 'Wild Safari Breakfast and Pasta Set', price: 2000, compareAt: 2250, rating: '4.7', image: studioImage('bs04.jpg', '1691329556&width=1296'), secondaryImage: studioImage('bs03.jpg', '1691329556&width=1296'), href: '/products/wild-safari-breakfast-and-pasta-set' },
  { id: 'sundarbans-plates', name: 'Sundarbans Starter Plates - Set of 4', price: 2150, rating: '5.0', image: studioImage('untitled-3_ded2b6a6-5f12-4205-a54d-473c9684d95e.jpg', '1707414810&width=1638'), secondaryImage: studioImage('untitled-4_29d0dec2-6d13-43af-9b7e-e676d9435073.jpg', '1707414810&width=1638'), href: '/products/sundarbans-starter-plates-set-of-4' },
  { id: 'snack-plates', name: 'Snack Plate Set of 4', price: 2250, rating: '5.0', image: studioImage('plates_01_copy.jpg', '1718349693&width=3087'), secondaryImage: studioImage('Screenshot_2024-06-14_at_12.51.56_PM.png', '1718349726&width=1440'), href: '/products/snack-plate-set-of-4' },
  { id: 'shallow-oval-platters', name: 'Shallow Oval Platters / Starter Plates : Set of 4', price: 3900, image: studioImage('Untitled.jpg', '1718171040&width=1456'), href: '/products/shallow-oval-platters-starter-plates-set-of-4' },
  { id: 'vasant-tea-cups', name: 'Vasant Tea Cups : Set of 4', price: 2300, rating: '5.0', image: studioImage('teacup01.jpg', '1690777833&width=1600'), href: '/products/vasant-tea-cups' },
  { id: 'vasant-mugs', name: 'Vasant Mugs - Set of 2', price: 1600, compareAt: 1750, rating: '5.0', image: studioImage('mug02.jpg', '1690728018&width=1600'), href: '/products/vasant-mugs-set-of-2' },
  { id: 'vasant-shallow-bowls', name: 'Vasant Shallow Bowls : Set of 2', price: 1500, rating: '4.0', image: studioImage('pastabow2.jpg', '1690824414&width=1200'), href: '/products/vasant-shallow-bowls-set-of-2' },
  { id: 'vintage-garden-plates', name: 'Vintage Garden Dinner Plates - Set of 4', price: 4050, rating: '4.6', image: studioImage('vinatgedp.jpg', '1707716587&width=3136'), href: '/products/vintage-garden-dinner-plates-set-of-4' },
  { id: 'adventure-breakfast', name: 'Adventure Breakfast Set', price: 2200, image: studioImage('website.jpg', '1720699336&width=3968'), href: '/products/adventure-breakfast-set' },
  { id: 'vintage-garden-mugs', name: 'Vintage Garden Coffee Mugs - Set of 2', price: 1600, rating: '4.8', image: studioImage('untitled-2_2a6d34c4-93b1-4a0d-87e5-11424b9ca1a4.jpg', '1707415389'), href: '/products/vintage-garden-coffee-mugs-set-of-2' },
  { id: 'vasant-serving-bowls', name: 'Vasant Serving Bowls : Set of 2', price: 1750, rating: '5.0', image: studioImage('serving-bowl01.jpg', '1690825889&width=1600'), href: '/products/vasant-serving-bowls-set-of-2' },
  { id: 'gulistan-plates', name: 'Gulistān Starter Plates - Set of 4', price: 2150, rating: '4.6', image: studioImage('25.png', '1684339872&width=1000'), href: '/products/gulistan-starter-plates-set-of-4' },
  { id: 'anaar-candle-box', name: 'Anaar Double Candle Gift Box', price: 2900, image: studioImage('double1.jpg', '1731399600&width=4211'), href: '/products/anaar-double-candle-gift-box' },
  { id: 'anaar-tea-cups', name: 'Anaar Tea Cups : Set of 4', price: 2200, rating: '5.0', image: studioImage('DSC0548e_cdc1a279-ba3f-4c83-8525-fe7d087bc1a5.jpg', '1746598019&width=4012'), href: '/products/vasant-tea-cups-set-of-4' },
  { id: 'anaar-coffee-mugs', name: 'Anaar Coffee Mugs - Set of 2', price: 1600, rating: '5.0', image: studioImage('DSC0539e_56e04eb0-92ec-46ab-8e18-74620b7117b9.jpg', '1746597959&width=4012'), href: '/products/anaar-coffee-mugs-set-of-2' },
  { id: 'marigold-candle', name: 'Marigold Candle and Stand Gift Box', price: 1750, image: studioImage('mari1.jpg', '1760075656&width=1500'), secondaryImage: studioImage('mari3.jpg', '1760075656&width=1500'), href: '/products/marigold-candle-and-stand-gift-box' },
];

export const newArrivals = [
  { id: 'milk-cookies', name: 'Milk & Cookies : Happiness Box', price: 1100, image: studioImage('IMG_4792_2.jpg', '1784110419&width=4032'), secondaryImage: studioImage('IMG_4782_2_7e0f0404-de57-4d3f-b127-bdf89e82c300.jpg', '1784271016&width=1200'), href: '/products/milk-cookies-happiness-box' },
  { id: 'under-sea', name: 'Under the Sea Dinner Set', price: 3350, image: studioImage('IMG_8365edited.jpg', '1771481864&width=3024'), secondaryImage: studioImage('IMG_8378edited.jpg', '1771481864&width=3024'), href: '/products/unicorn-breakfast-set-bowl-mug-copy' },
  { id: 'anaar-gift-box', name: '3 Tray Gift Box Anaar', price: 6100, image: studioImage('box1_96a6c2d3-7c09-4621-9f7c-e9d7053954d9.jpg', '1763449735&width=1500'), secondaryImage: studioImage('box2_bd7c8ca3-e0ce-413b-9f29-001abab6105f.jpg', '1763449735&width=1500'), href: '/products/3-tray-gift-box-anaar' },
  { id: 'marigold-candle-new', name: 'Marigold Candle and Stand Gift Box', price: 1750, image: studioImage('mari1.jpg', '1760075656&width=1500'), secondaryImage: studioImage('mari3.jpg', '1760075656&width=1500'), href: '/products/marigold-candle-and-stand-gift-box' },
  { id: 'anaar-tea-set', name: 'Anaar - 12 Piece Tea Cup & Snack Plate Set', price: 7500, rating: '5.0', image: studioImage('DSC0591e_428f61a9-4c71-4c47-adf6-5e8e170081cf.jpg', '1746598371&width=4012'), secondaryImage: studioImage('web_1-100.jpg', '1749023752&width=1200'), href: '/products/anaar-12-piece-tea-set' },
  { id: 'anaar-dinner-set', name: 'Anaar - 22 piece Dinner Set', price: 17550, rating: '5.0', image: studioImage('DSC0579e_6e8689fc-7d9f-4a55-a04d-27ac657f9222.jpg', '1746598719&width=4012'), href: '/products/anaar-22-piece-dinner-set' },
  { id: 'anaar-oval-cup', name: 'Anaar - Set of 2 Oval Cup with Saucer', price: 3000, rating: '5.0', image: studioImage('DSC0536e.jpg', '1746423926&width=4015'), href: '/products/anaar-set-of-2-oval-cup-with-saucer' },
  { id: 'anaar-serving-bowls', name: 'Anaar - Set of 2 Serving Bowls', price: 1950, rating: '5.0', image: studioImage('DSC0554e_67201251-2538-45be-b586-5ca740033fd5.jpg', '1746598915&width=4010'), href: '/products/anaar-set-of-2-serving-bowls' },
];

export const featuredDinnerSet = {
  id: 'vasant-28-piece-dinner-set',
  name: 'Vasant 28 Pieces Dinner set',
  price: 17500,
  rating: '5.0',
  image: studioImage('untitled-1_ededf826-4f58-4aec-b862-943c46bfa224.jpg', '1707411814&width=2048'),
  images: [
    studioImage('untitled-1_ededf826-4f58-4aec-b862-943c46bfa224.jpg', '1707411814&width=2048'),
    studioImage('untitled-3_5b7deaa5-baa9-4495-940e-2361b7ee0e17.jpg', '1707411815&width=2048'),
    studioImage('untitled-4_5fcd46e7-eefa-4e80-a464-8e92b72344d1.jpg', '1707411814&width=2048'),
    studioImage('closeup.jpg', '1707411814&width=2831'),
  ],
  href: '/products/vasant-28-pieces-dinner-set',
};
