import type { Collection, GalleryVideo, Subcategory } from '../types/index.ts';

export type { Collection, Subcategory, GalleryVideo };

const slugify = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const collectionPath = (slug: string): string => `/collections/${slug}`;
export const subcategorySlug = (title: string): string => slugify(title);
export const subcategoryPath = (slug: string, title: string): string =>
  '/collections/' + slug + '/' + subcategorySlug(title);

export const storeCollections: Collection[] = [
  {
    title: 'Trousseau & Wedding Hampers',
    slug: 'trousseau-wedding-hampers',
    image: '/assets/images/optimized/category-trousseau-card.webp',
    description: 'Personal celebrations and wedding gifting.',
    subcategories: [
      { title: 'Trousseau', image: '/assets/images/optimized/catalog/IMG_1167.webp', workImages: ['/assets/images/optimized/catalog/IMG_1169.webp'] },
      { title: 'Wedding Hampers', image: '/assets/images/optimized/category-trousseau-card.webp', workImages: ['/assets/images/optimized/catalog/IMG_2897-3.webp'] },
      { title: 'Baby Hampers', image: '/assets/images/optimized/catalog/IMG_0035.webp' },
      { title: 'Room Hampers', image: '/assets/images/optimized/catalog/IMG_3596.webp' },
      { title: 'Bridesmaid Gifts', image: '/assets/images/optimized/catalog/IMG_4525.webp', workImages: ['/assets/images/optimized/catalog/IMG_2897-3.webp'] },
    ],
  },
  {
    title: 'Return Favours',
    slug: 'return-favours',
    image: '/assets/images/optimized/catalog/IMG_4846.webp',
    description: 'Gifts for guests and special occasions.',
    subcategories: [
      { title: 'Wedding Return Favours', image: '/assets/images/optimized/catalog/IMG_4846.webp' },
      { title: 'Birthday Return Favours', image: '/assets/images/optimized/catalog/IMG_1151.webp' },
      { title: 'Housewarming Favours', image: '/assets/images/optimized/catalog/IMG_3596.webp' },
    ],
  },
  {
    title: 'Seasonal & Occasion Gifting',
    slug: 'seasonal-occasion-gifting',
    image: '/assets/images/optimized/catalog/IMG_2149.webp',
    description: 'Thoughtful gifts for seasonal moments and personal milestones.',
    subcategories: [
      { title: 'Mother\u2019s Day', image: '/assets/images/optimized/catalog/IMG_3596.webp' },
      { title: 'Father\u2019s Day', image: '/assets/images/optimized/catalog/IMG_4949.webp' },
      { title: 'Valentine\u2019s Day', image: '/assets/images/optimized/catalog/IMG_2149.webp' },
      { title: 'Mom-to-be', image: '/assets/images/optimized/catalog/IMG_0035.webp' },
    ],
    note: 'Looking for a custom celebration or milestone? Connect with us on WhatsApp to craft a hamper around your exact occasion.',
  },
  {
    title: 'Ring Platters',
    slug: 'ring-platters',
    image: '/assets/images/optimized/category-ring-platter-card.webp',
    description: 'A special presentation for the ring ceremony.',
    subcategories: [
      { title: 'Ring Platters', image: '/assets/images/optimized/category-ring-platter-card.webp', workImages: ['/assets/images/optimized/catalog/chocolate-khoncha-table.webp'] },
    ],
  },
  {
    title: 'Festive Hampers',
    slug: 'festive-hampers',
    image: '/assets/images/optimized/category-festive-card.webp',
    description: 'Festival gifting hampers, thoughtfully put together.',
    subcategories: [
      { title: 'Festival Gifting Hampers', image: '/assets/images/optimized/category-festive-card.webp', workImages: ['/assets/images/optimized/catalog/IMG_4949.webp'] },
    ],
  },
  {
    title: 'Corporate Hampers',
    slug: 'corporate-hampers',
    image: '/assets/images/optimized/catalog/IMG_4949.webp',
    description: 'Corporate gifting hampers.',
    subcategories: [
      { title: 'Corporate Gifting Hampers', image: '/assets/images/optimized/catalog/IMG_4949.webp', workImages: ['/assets/images/optimized/catalog/IMG_4846.webp'] },
    ],
  },
];

const catalogImage = (name: string): string => '/assets/images/optimized/catalog/' + name + '.webp';
const categoryImage = (name: string): string => '/assets/images/optimized/' + name + '.webp';

const gallerySets: Record<string, string[]> = {
  trousseau: [catalogImage('IMG_1167'), catalogImage('IMG_1169'), catalogImage('IMG_1773')],
  'wedding-hampers': [catalogImage('IMG_2897-3'), catalogImage('IMG_4525-2'), catalogImage('IMG_4533')],
  'baby-hampers': [catalogImage('IMG_0035'), catalogImage('IMG_2117'), catalogImage('IMG_2118')],
  'room-hampers': [catalogImage('IMG_3596'), catalogImage('IMG_4531'), catalogImage('IMG_4537')],
  'bridesmaid-gifts': [catalogImage('IMG_2897-3'), catalogImage('IMG_4525-2'), catalogImage('IMG_4531')],
  'wedding-return-favours': [catalogImage('IMG_4846'), catalogImage('IMG_3740'), catalogImage('IMG_3743')],
  'birthday-return-favours': [catalogImage('IMG_1151'), catalogImage('IMG_4846')],
  'housewarming-favours': [catalogImage('IMG_4537'), catalogImage('IMG_3596'), catalogImage('IMG_4531')],
  'mother-s-day': [catalogImage('IMG_3596'), catalogImage('IMG_2149'), catalogImage('IMG_4531')],
  'father-s-day': [catalogImage('IMG_4949'), catalogImage('IMG_4537')],
  'valentine-s-day': [catalogImage('IMG_2149'), catalogImage('IMG_2118'), catalogImage('IMG_4533')],
  'mom-to-be': [catalogImage('IMG_0035'), catalogImage('IMG_2117')],
  'ring-platters': [categoryImage('category-ring-platter-card'), catalogImage('chocolate-khoncha-table')],
  'festival-gifting-hampers': [categoryImage('category-festive-card'), catalogImage('IMG_4949'), catalogImage('IMG_4544')],
  'corporate-gifting-hampers': [catalogImage('IMG_4949'), catalogImage('IMG_4846'), catalogImage('IMG_3596')],
};

const galleryVideoSets: Record<string, GalleryVideo[]> = {
  trousseau: [{ src: '/assets/images/IMG_1172.mov', poster: catalogImage('IMG_1167') }],
  'wedding-hampers': [{ src: '/assets/images/IMG_4534.mov', poster: catalogImage('IMG_4533') }],
  'wedding-return-favours': [{ src: '/assets/images/IMG_4853.mov', poster: catalogImage('IMG_4846') }],
  'festival-gifting-hampers': [{ src: '/assets/images/IMG_4549.mov', poster: catalogImage('IMG_4544') }],
};

storeCollections.forEach((category) => {
  category.subcategories.forEach((subcategory) => {
    const subcategoryKey = slugify(subcategory.title);
    const gallerySources = gallerySets[subcategoryKey] || [subcategory.image];
    subcategory.galleryImages = gallerySources;
    subcategory.galleryPreviewImages = gallerySources.slice(0, 2).map((src) => '/assets/images/optimized/previews/' + src.split('/').pop());
    subcategory.galleryVideos = galleryVideoSets[subcategoryKey] || [];
  });
});

export interface SearchPageEntry {
  title: string;
  description: string;
  image: string;
  href: string;
  keywords: string;
}

const siteSearchPages: SearchPageEntry[] = [
  { title: 'NI Square Packaging', description: 'Home and gifting inspiration', image: '/assets/images/optimized/hero-what-a-story-desktop.jpg', href: '/', keywords: 'ni square packaging home hampers gifting' },
  { title: 'Our Story', description: 'Meet the founders and learn about NI Square', image: '/assets/images/optimized/catalog/IMG_1167.webp', href: '/pages/our-story', keywords: 'founders about story nikita' },
  { title: 'Services', description: 'Custom-made hampers and personalised packaging', image: '/assets/images/optimized/catalog/IMG_3596.webp', href: '/pages/services', keywords: 'custom gifts packaging hamper services' },
  { title: 'Contact the founders', description: 'Plan a custom hamper on WhatsApp', image: '/assets/images/optimized/catalog/IMG_1167.webp', href: '/pages/contact', keywords: 'contact whatsapp message plan enquiry' },
];

export interface SearchMatch {
  title: string;
  description: string;
  image: string;
  href: string;
}

export function searchCollections(q: string = ''): SearchMatch[] {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  const pages = siteSearchPages.filter((page) => (page.title + ' ' + page.description + ' ' + page.keywords).toLowerCase().includes(term));
  const categories: SearchMatch[] = storeCollections.flatMap((collection) => {
    const subcategories: SearchMatch[] = collection.subcategories
      .filter((subcategory) => (subcategory.title + ' ' + collection.title).toLowerCase().includes(term))
      .map((subcategory) => ({ title: subcategory.title, description: collection.title, image: subcategory.image, href: subcategoryPath(collection.slug, subcategory.title) }));
    return (collection.title + ' ' + collection.description).toLowerCase().includes(term)
      ? [{ title: collection.title, description: collection.description, image: collection.image, href: collectionPath(collection.slug) }, ...subcategories]
      : subcategories;
  });
  return [...pages, ...categories];
}
