const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const collectionPath = (slug) => `/collections/${slug}`;
export const subcategorySlug = (title) => slugify(title);
export const subcategoryPath = (slug, title) => '/collections/' + slug + '/' + subcategorySlug(title);
export const storeCollections = [
  {
    title: 'Trousseau & Wedding Hampers', slug: 'trousseau-wedding-hampers', image: '/assets/images/optimized/category-trousseau-card.jpg', description: 'Personal celebrations and wedding gifting.',
    subcategories: [
      { title: 'Trousseau', image: '/assets/images/optimized/catalog/IMG_1167.webp', workImages: ['/assets/images/optimized/catalog/IMG_1169.webp'] },
      { title: 'Wedding Hampers', image: '/assets/images/optimized/category-trousseau-card.jpg', workImages: ['/assets/images/optimized/catalog/IMG_2897-3.webp'] },
      { title: 'Baby Hampers', image: '/assets/images/optimized/catalog/IMG_0035.webp' },
      { title: 'Room Hampers', image: '/assets/images/optimized/catalog/IMG_3596.webp' },
      { title: 'Bridesmaid Gifts', image: '/assets/images/optimized/catalog/IMG_4525.webp', workImages: ['/assets/images/optimized/catalog/IMG_2897-3.webp'] },
    ],
  },
  {
    title: 'Return Favours', slug: 'return-favours', image: '/assets/images/optimized/catalog/IMG_4846.webp', description: 'Gifts for guests and special occasions.',
    subcategories: [
      { title: 'Wedding Return Favours', image: '/assets/images/optimized/catalog/IMG_4846.webp' },
      { title: 'Birthday Return Favours', image: '/assets/images/optimized/catalog/IMG_1151.webp' },
      { title: 'Housewarming Favours', image: '/assets/images/optimized/catalog/IMG_3596.webp' },
    ],
  },
  {
    title: 'Seasonal & Occasion Gifting', slug: 'seasonal-occasion-gifting', image: '/assets/images/optimized/catalog/IMG_2149.webp', description: 'Thoughtful gifts for seasonal moments and personal milestones.',
    subcategories: [
      { title: 'Mother\u2019s Day', image: '/assets/images/optimized/catalog/IMG_3596.webp' },
      { title: 'Father\u2019s Day', image: '/assets/images/optimized/catalog/IMG_4949.webp' },
      { title: 'Valentine\u2019s Day', image: '/assets/images/optimized/catalog/IMG_2149.webp' },
      { title: 'Mom-to-be', image: '/assets/images/optimized/catalog/IMG_0035.webp' },
    ],
    note: 'More occasions can be added later.',
  },
  {
    title: 'Ring Platters', slug: 'ring-platters', image: '/assets/images/optimized/category-ring-platter-card.jpg', description: 'A special presentation for the ring ceremony.',
    subcategories: [{ title: 'Ring Platters', image: '/assets/images/optimized/category-ring-platter-card.jpg', workImages: ['/assets/images/optimized/catalog/chocolate-khoncha-table.webp'] }],
  },
  {
    title: 'Festive Hampers', slug: 'festive-hampers', image: '/assets/images/optimized/category-festive-card.jpg', description: 'Festival gifting hampers, thoughtfully put together.',
    subcategories: [{ title: 'Festival Gifting Hampers', image: '/assets/images/optimized/category-festive-card.jpg', workImages: ['/assets/images/optimized/catalog/IMG_4949.webp'] }],
  },
  {
    title: 'Corporate Hampers', slug: 'corporate-hampers', image: '/assets/images/optimized/catalog/IMG_4949.webp', description: 'Corporate gifting hampers.',
    subcategories: [{ title: 'Corporate Gifting Hampers', image: '/assets/images/optimized/catalog/IMG_4949.webp', workImages: ['/assets/images/optimized/catalog/IMG_4846.webp'] }],
  },
];
const gallerySets = {
  trousseau: ['/assets/images/IMG_1167.jpeg', '/assets/images/IMG_1169.jpeg', '/assets/images/IMG_1773.jpeg'],
  'wedding-hampers': ['/assets/images/IMG_2897%203.jpeg', '/assets/images/IMG_4525%202.jpeg', '/assets/images/IMG_4533.jpeg'],
  'baby-hampers': ['/assets/images/IMG_0035.jpeg', '/assets/images/IMG_2117.jpeg', '/assets/images/IMG_2118.jpeg'],
  'room-hampers': ['/assets/images/IMG_3596.jpeg', '/assets/images/IMG_4531.jpeg', '/assets/images/IMG_4537.jpeg'],
  'bridesmaid-gifts': ['/assets/images/IMG_2897%203.jpeg', '/assets/images/IMG_4525%202.jpeg', '/assets/images/IMG_4531.jpeg'],
  'wedding-return-favours': ['/assets/images/IMG_4846.jpeg', '/assets/images/IMG_3740.jpeg', '/assets/images/IMG_3743.jpeg'],
  'birthday-return-favours': ['/assets/images/IMG_1151.jpeg', '/assets/images/IMG_4846.jpeg'],
  'housewarming-favours': ['/assets/images/IMG_4537.jpeg', '/assets/images/IMG_3596.jpeg', '/assets/images/IMG_4531.jpeg'],
  'mother-s-day': ['/assets/images/IMG_3596.jpeg', '/assets/images/IMG_2149.jpeg', '/assets/images/IMG_4531.jpeg'],
  'father-s-day': ['/assets/images/IMG_4949.jpeg', '/assets/images/IMG_4537.jpeg'],
  'valentine-s-day': ['/assets/images/IMG_2149.jpeg', '/assets/images/IMG_2118.jpeg', '/assets/images/IMG_4533.jpeg'],
  'mom-to-be': ['/assets/images/IMG_0035.jpeg', '/assets/images/IMG_2117.jpeg'],
  'ring-platters': ['/assets/images/optimized/category-ring-platter-card.jpg', '/assets/images/optimized/catalog/chocolate-khoncha-table.webp'],
  'festival-gifting-hampers': ['/assets/images/optimized/category-festive-card.jpg', '/assets/images/IMG_4949.jpeg', '/assets/images/IMG_4544.jpeg'],
  'corporate-gifting-hampers': ['/assets/images/IMG_4949.jpeg', '/assets/images/IMG_4846.jpeg', '/assets/images/IMG_3596.jpeg'],
};
function optimizedGalleryAsset(src, size = 'catalog') {
  if (src.includes('/optimized/')) return src;
  const filename = decodeURIComponent(src.split('/').pop()).replace(/\.[^.]+$/, '').replace(/\s+/g, '-') + '.webp';
  return '/assets/images/optimized/' + size + '/' + filename;
}
const galleryVideoSets = {
  trousseau: [{ src: '/assets/images/IMG_1172.mov', poster: '/assets/images/IMG_1167.jpeg' }],
  'wedding-hampers': [{ src: '/assets/images/IMG_4534.mov', poster: '/assets/images/IMG_4533.jpeg' }],
  'wedding-return-favours': [{ src: '/assets/images/IMG_4853.mov', poster: '/assets/images/IMG_4846.jpeg' }],
  'festival-gifting-hampers': [{ src: '/assets/images/IMG_4549.mov', poster: '/assets/images/IMG_4544.jpeg' }],
};

storeCollections.forEach((category) => {
  category.subcategories.forEach((subcategory) => {
    const subcategoryKey = slugify(subcategory.title);
    const gallerySources = gallerySets[subcategoryKey] || [subcategory.image];
    subcategory.galleryImages = gallerySources.map((src) => optimizedGalleryAsset(src));
    subcategory.galleryPreviewImages = gallerySources.slice(0, 2).map((src) => optimizedGalleryAsset(src, 'previews'));
    subcategory.galleryVideos = (galleryVideoSets[subcategoryKey] || []).map((video) => ({ ...video, poster: optimizedGalleryAsset(video.poster) }));
  });
});
const siteSearchPages = [
 { title: 'NI Square Packaging', description: 'Home and gifting inspiration', image: '/assets/images/optimized/hero-what-a-story-desktop.jpg', href: '/', keywords: 'ni square packaging home hampers gifting' },
 { title: 'Our Story', description: 'Meet the founders and learn about NI Square', image: '/assets/images/optimized/catalog/IMG_1167.webp', href: '/pages/our-story', keywords: 'founders about story nikita' },
 { title: 'Services', description: 'Custom-made hampers and personalised packaging', image: '/assets/images/optimized/catalog/IMG_3596.webp', href: '/pages/services', keywords: 'custom gifts packaging hamper services' },
 { title: 'Contact the founders', description: 'Plan a custom hamper on WhatsApp', image: '/assets/images/optimized/catalog/IMG_1167.webp', href: '/pages/contact', keywords: 'contact whatsapp message plan enquiry' },
];

export function searchCollections(q = '') {
 const term = q.trim().toLowerCase();
 if (!term) return [];
 const pages = siteSearchPages.filter((page) => (page.title + ' ' + page.description + ' ' + page.keywords).toLowerCase().includes(term));
 const categories = storeCollections.flatMap((collection) => {
  const subcategories = collection.subcategories
   .filter((subcategory) => (subcategory.title + ' ' + collection.title).toLowerCase().includes(term))
   .map((subcategory) => ({ title: subcategory.title, description: collection.title, image: subcategory.image, href: subcategoryPath(collection.slug, subcategory.title) }));
  return (collection.title + ' ' + collection.description).toLowerCase().includes(term)
   ? [{ title: collection.title, description: collection.description, image: collection.image, href: collectionPath(collection.slug) }, ...subcategories]
   : subcategories;
 });
 return [...pages, ...categories];
}

