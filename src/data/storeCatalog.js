const slugify=(v)=>v.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const storeCollections = [
  {
    title: 'Trousseau & Wedding Hampers', slug: 'trousseau-wedding-hampers', image: '/assets/images/IMG_1167.jpeg', description: 'Personal celebrations and wedding gifting.',
    subcategories: [
      { title: 'Trousseau', image: '/assets/images/IMG_1167.jpeg' },
      { title: 'Wedding Hampers', image: '/assets/images/IMG_2897 3.jpeg' },
      { title: 'Baby Hampers', image: '/assets/images/IMG_0035.jpeg' },
      { title: 'Room Hampers', image: '/assets/images/IMG_1169.jpeg' },
      { title: 'Bridesmaid Gifts', image: '/assets/images/IMG_4525.jpeg' },
    ],
  },
  {
    title: 'Return Favours', slug: 'return-favours', image: '/assets/images/IMG_4846.jpeg', description: 'Gifts for guests and special occasions.',
    subcategories: [
      { title: 'Wedding Return Favours', image: '/assets/images/IMG_4846.jpeg' },
      { title: 'Birthday Return Favours', image: '/assets/images/IMG_1151.jpeg' },
      { title: 'Housewarming Favours', image: '/assets/images/IMG_3596.jpeg' },
    ],
  },
  {
    title: 'Seasonal & Occasion Gifting', slug: 'seasonal-occasion-gifting', image: '/assets/images/IMG_4949.jpeg', description: 'Thoughtful gifts for seasonal moments and personal milestones.',
    subcategories: [
      { title: 'Mother\u2019s Day', image: '/assets/images/IMG_3596.jpeg' },
      { title: 'Father\u2019s Day', image: '/assets/images/IMG_4949.jpeg' },
      { title: 'Valentine\u2019s Day', image: '/assets/images/IMG_2149.jpeg' },
      { title: 'Mom-to-be', image: '/assets/images/IMG_0035.jpeg' },
    ],
    note: 'More occasions can be added later.',
  },
  {
    title: 'Ring Platters', slug: 'ring-platters', image: '/assets/images/chocolate-khoncha-table.jpg', description: 'A special presentation for the ring ceremony.',
    subcategories: [{ title: 'Ring Platters', image: '/assets/images/chocolate-khoncha-table.jpg' }],
  },
  {
    title: 'Festive Hampers', slug: 'festive-hampers', image: '/assets/images/IMG_4949.jpeg', description: 'Festival gifting hampers, thoughtfully put together.',
    subcategories: [{ title: 'Festival Gifting Hampers', image: '/assets/images/IMG_4949.jpeg' }],
  },
  {
    title: 'Corporate Hampers', slug: 'corporate-hampers', image: '/assets/images/IMG_3596.jpeg', description: 'Corporate gifting hampers.',
    subcategories: [{ title: 'Corporate Gifting Hampers', image: '/assets/images/IMG_3596.jpeg' }],
  },
];
const siteSearchPages = [
 { title: 'NI Square Packaging', description: 'Home and gifting inspiration', image: '/assets/images/pexels-cottonbro-6832992.jpg', href: '/', keywords: 'ni square packaging home hampers gifting' },
 { title: 'Our Story', description: 'Meet the founders and learn about NI Square', image: '/assets/images/IMG_1167.jpeg', href: '/pages/our-story', keywords: 'founders about story nikita' },
 { title: 'Services', description: 'Custom-made hampers and personalised packaging', image: '/assets/images/pexels-iris-32188338.jpg', href: '/pages/services', keywords: 'custom gifts packaging hamper services' },
 { title: 'Contact the founders', description: 'Plan a custom hamper on WhatsApp', image: '/assets/images/IMG_1167.jpeg', href: '/pages/contact', keywords: 'contact whatsapp message plan enquiry' },
];

export function searchCollections(q = '') {
 const term = q.trim().toLowerCase();
 if (!term) return [];
 const pages = siteSearchPages.filter((page) => (page.title + ' ' + page.description + ' ' + page.keywords).toLowerCase().includes(term));
 const categories = storeCollections.flatMap((collection) => {
  const subcategories = collection.subcategories
   .filter((subcategory) => (subcategory.title + ' ' + collection.title).toLowerCase().includes(term))
   .map((subcategory) => ({ title: subcategory.title, description: collection.title, image: subcategory.image, href: '/collections/' + collection.slug + '#subcategory-' + slugify(subcategory.title) }));
  return (collection.title + ' ' + collection.description).toLowerCase().includes(term)
   ? [{ title: collection.title, description: collection.description, image: collection.image, href: '/collections/' + collection.slug }, ...subcategories]
   : subcategories;
 });
 return [...pages, ...categories];
}

