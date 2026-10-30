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
    description: 'Personalised trousseau packing, wedding hampers, and gifts for your celebrations.',
    subcategories: [
      {
        title: 'Trousseau',
        image: '/assets/images/optimized/catalog/trousseau-1.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_1169.webp',
          '/assets/images/optimized/catalog/IMG_1773.webp',
          '/assets/images/optimized/catalog/IMG_7162.webp',
        ],
      },
      {
        title: 'Baby Hampers',
        image: '/assets/images/optimized/catalog/IMG_4732.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_9090.webp',
          '/assets/images/optimized/catalog/IMG_8627.webp',
          '/assets/images/optimized/catalog/IMG_0035.webp',
        ],
      },
      {
        title: 'Room Hampers',
        image: '/assets/images/optimized/catalog/IMG_0659.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_0660.webp',
          '/assets/images/optimized/catalog/IMG_5762.webp',
          '/assets/images/optimized/catalog/IMG_8703.webp',
        ],
      },
      {
        title: 'Bridesmaid Gifts',
        image: '/assets/images/optimized/catalog/IMG_0651.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_0652.webp',
          '/assets/images/optimized/catalog/IMG_0655.webp',
          '/assets/images/optimized/catalog/IMG_8697.webp',
        ],
      },
    ],
  },
  {
    title: 'Return Favours',
    slug: 'return-favours',
    image: '/assets/images/optimized/catalog/IMG_0709.webp',
    description: 'Thoughtful favours for wedding, birthday, and housewarming celebrations.',
    subcategories: [
      {
        title: 'Wedding Return Favours',
        image: '/assets/images/optimized/catalog/IMG_0709.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_0710.webp',
          '/assets/images/optimized/catalog/IMG_0713.webp',
          '/assets/images/optimized/catalog/IMG_0722.webp',
        ],
      },
      {
        title: 'Birthday Return Favours',
        image: '/assets/images/optimized/catalog/IMG_0216.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_0696.webp',
          '/assets/images/optimized/catalog/IMG_0698.webp',
          '/assets/images/optimized/catalog/IMG_0701.webp',
        ],
      },
      {
        title: 'Housewarming Favours',
        image: '/assets/images/optimized/catalog/IMG_3596.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_4537.webp',
          '/assets/images/optimized/catalog/IMG_4531.webp',
        ],
      },
    ],
  },
  {
    title: 'Seasonal & Occasion Gifting',
    slug: 'seasonal-occasion-gifting',
    image: '/assets/images/optimized/catalog/valentine-s-day-1.webp',
    description: 'Personalised gifts for festivals, milestones, and the moments you want to celebrate.',
    subcategories: [
      {
        title: 'Mother\u2019s Day',
        image: '/assets/images/optimized/catalog/IMG_7387.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_7389.webp',
          '/assets/images/optimized/catalog/IMG_3596.webp',
        ],
      },
      {
        title: 'Father\u2019s Day',
        image: '/assets/images/optimized/catalog/IMG_0738.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_0740.webp',
          '/assets/images/optimized/catalog/IMG_0743.webp',
          '/assets/images/optimized/catalog/IMG_4949.webp',
        ],
      },
      {
        title: 'Valentine\u2019s Day',
        image: '/assets/images/optimized/catalog/valentine-s-day-1.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_0744.webp',
          '/assets/images/optimized/catalog/IMG_4534.webp',
          '/assets/images/optimized/catalog/IMG_6338.webp',
        ],
      },
      {
        title: 'Mom-to-be',
        image: '/assets/images/optimized/catalog/IMG_0732.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_0734.webp',
          '/assets/images/optimized/catalog/IMG_0735.webp',
          '/assets/images/optimized/catalog/IMG_8145.webp',
        ],
      },
    ],
    note: 'Looking for a custom celebration or milestone? Connect with us on WhatsApp to craft a hamper around your exact occasion.',
  },
  {
    title: 'Ring Platters',
    slug: 'ring-platters',
    image: '/assets/images/optimized/ring-platters.webp',
    description: 'A hand-finished platter to make your ring ceremony feel personal.',
    subcategories: [
      {
        title: 'Ring Platters',
        image: '/assets/images/optimized/ring-platters.webp',
        workImages: [
          '/assets/images/optimized/catalog/ring-platters.webp',
          '/assets/images/optimized/catalog/IMG_6913.webp',
        ],
      },
    ],
  },
  {
    title: 'Festive Hampers',
    slug: 'festive-hampers',
    image: '/assets/images/optimized/category-festive-card.webp',
    description: 'Festive hampers arranged with thoughtful gifts and personal finishing touches.',
    subcategories: [
      {
        title: 'Festival Gifting Hampers',
        image: '/assets/images/optimized/catalog/IMG_0160.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_2149.webp',
          '/assets/images/optimized/catalog/IMG_6913.webp',
          '/assets/images/optimized/catalog/IMG_7051.webp',
          '/assets/images/optimized/catalog/IMG_9713.webp',
        ],
      },
    ],
  },
  {
    title: 'Corporate Hampers',
    slug: 'corporate-hampers',
    image: '/assets/images/optimized/catalog/corporate-gifting-hampers-1.webp',
    description: 'Personalised hampers and gift packaging for teams, clients, and company occasions.',
    subcategories: [
      {
        title: 'Corporate Gifting Hampers',
        image: '/assets/images/optimized/catalog/corporate-gifting-hampers-1.webp',
        workImages: [
          '/assets/images/optimized/catalog/IMG_4949.webp',
          '/assets/images/optimized/catalog/IMG_4846.webp',
          '/assets/images/optimized/catalog/IMG_3596.webp',
        ],
      },
    ],
  },
];

const catalogImage = (name: string): string => '/assets/images/optimized/catalog/' + name + '.webp';
const categoryImage = (name: string): string => '/assets/images/optimized/' + name + '.webp';

const gallerySets: Record<string, string[]> = {
  trousseau: [
    catalogImage('trousseau-1'),
    catalogImage('trousseau-2'),
    catalogImage('IMG_0750'),
    catalogImage('IMG_0751'),
    catalogImage('IMG_0752'),
    catalogImage('IMG_1169'),
    catalogImage('IMG_1773'),
    catalogImage('IMG_1788'),
    catalogImage('IMG_6223'),
    catalogImage('IMG_7162'),
    catalogImage('IMG_7187'),
    catalogImage('IMG_9374'),
    catalogImage('IMG_9600'),
    catalogImage('IMG_1167'),
  ],
  'baby-hampers': [
    catalogImage('IMG_4732'),
    catalogImage('IMG_8627'),
    catalogImage('IMG_9090'),
    catalogImage('IMG_9091'),
    catalogImage('IMG_9447'),
    catalogImage('IMG_0035'),
    catalogImage('IMG_2117'),
    catalogImage('IMG_2118'),
  ],
  'room-hampers': [
    catalogImage('IMG_0659'),
    catalogImage('IMG_0660'),
    catalogImage('IMG_0661'),
    catalogImage('IMG_4595'),
    catalogImage('IMG_5762'),
    catalogImage('IMG_5768'),
    catalogImage('IMG_8703'),
    catalogImage('IMG_8706'),
    catalogImage('IMG_3596'),
    catalogImage('IMG_4531'),
    catalogImage('IMG_4537'),
  ],
  'bridesmaid-gifts': [
    catalogImage('IMG_0651'),
    catalogImage('IMG_0652'),
    catalogImage('IMG_0653'),
    catalogImage('IMG_0654'),
    catalogImage('IMG_0655'),
    catalogImage('IMG_0656'),
    catalogImage('IMG_0657'),
    catalogImage('IMG_0658'),
    catalogImage('IMG_8697'),
    catalogImage('IMG_4525'),
    catalogImage('IMG_2897-3'),
  ],
  'wedding-return-favours': [
    catalogImage('IMG_0709'),
    catalogImage('IMG_0710'),
    catalogImage('IMG_0711'),
    catalogImage('IMG_0712'),
    catalogImage('IMG_0713'),
    catalogImage('IMG_0714'),
    catalogImage('IMG_0715'),
    catalogImage('IMG_0716'),
    catalogImage('IMG_0717'),
    catalogImage('IMG_0718'),
    catalogImage('IMG_0719'),
    catalogImage('IMG_0720'),
    catalogImage('IMG_0721'),
    catalogImage('IMG_0722'),
    catalogImage('IMG_0723'),
    catalogImage('IMG_4846'),
    catalogImage('IMG_3740'),
    catalogImage('IMG_3743'),
  ],
  'birthday-return-favours': [
    catalogImage('IMG_0216'),
    catalogImage('IMG_0217'),
    catalogImage('IMG_0696'),
    catalogImage('IMG_0697'),
    catalogImage('IMG_0698'),
    catalogImage('IMG_0699'),
    catalogImage('IMG_0700'),
    catalogImage('IMG_0701'),
    catalogImage('IMG_0702'),
    catalogImage('IMG_0705'),
    catalogImage('IMG_0707'),
    catalogImage('IMG_0708'),
    catalogImage('IMG_1151'),
    catalogImage('IMG_4846'),
  ],
  'housewarming-favours': [
    catalogImage('IMG_4537'),
    catalogImage('IMG_3596'),
    catalogImage('IMG_4531'),
  ],
  'mother-s-day': [
    catalogImage('IMG_7387'),
    catalogImage('IMG_7389'),
    catalogImage('IMG_3596'),
    catalogImage('IMG_2149'),
    catalogImage('IMG_4531'),
  ],
  'father-s-day': [
    catalogImage('IMG_0738'),
    catalogImage('IMG_0740'),
    catalogImage('IMG_0743'),
    catalogImage('IMG_4949'),
    catalogImage('IMG_4537'),
  ],
  'valentine-s-day': [
    catalogImage('valentine-s-day-1'),
    catalogImage('IMG_0744'),
    catalogImage('IMG_0745'),
    catalogImage('IMG_0746'),
    catalogImage('IMG_4534'),
    catalogImage('IMG_4541'),
    catalogImage('IMG_6338'),
    catalogImage('IMG_6825'),
    catalogImage('IMG_8578'),
    catalogImage('IMG_2149'),
    catalogImage('IMG_2118'),
    catalogImage('IMG_4533'),
  ],
  'mom-to-be': [
    catalogImage('IMG_0732'),
    catalogImage('IMG_0733'),
    catalogImage('IMG_0734'),
    catalogImage('IMG_0735'),
    catalogImage('IMG_8145'),
    catalogImage('IMG_0035'),
    catalogImage('IMG_2117'),
  ],
  'ring-platters': [
    catalogImage('ring-platters'),
    catalogImage('IMG_6913'),
  ],
  'festival-gifting-hampers': [
    catalogImage('IMG_0160'),
    catalogImage('IMG_2149'),
    catalogImage('IMG_6913'),
    catalogImage('IMG_7051'),
    catalogImage('IMG_9713'),
    catalogImage('IMG_9937'),
    categoryImage('category-festive-card'),
    catalogImage('IMG_4949'),
    catalogImage('IMG_4544'),
  ],
  'corporate-gifting-hampers': [
    catalogImage('corporate-gifting-hampers-1'),
    catalogImage('IMG_4949'),
    catalogImage('IMG_4846'),
    catalogImage('IMG_3596'),
  ],
};

const galleryVideoSets: Record<string, GalleryVideo[]> = {
  trousseau: [
    { src: '/assets/videos/catalog/trousseau-06c16b795a324cf6ba0314d4194be0e6.mp4', poster: catalogImage('trousseau-1') },
    { src: '/assets/videos/catalog/trousseau-9295f75bc13841e786a09e2a211a1279.mp4', poster: catalogImage('IMG_1169') },
    { src: '/assets/videos/catalog/trousseau-IMG_1042.MOV', poster: catalogImage('IMG_1773') },
    { src: '/assets/images/IMG_1172.mov', poster: catalogImage('IMG_1167') },
  ],
  'baby-hampers': [
    { src: '/assets/videos/catalog/baby-hampers-120cb4d52e074692b760f1c76ffba7be.mp4', poster: catalogImage('IMG_4732') },
    { src: '/assets/videos/catalog/baby-hampers-efbe5f1f7c6e4caeb04c865413c0453d.mp4', poster: catalogImage('IMG_0035') },
  ],
  'room-hampers': [
    { src: '/assets/videos/catalog/room-hampers-IMG_5834.MOV', poster: catalogImage('IMG_0659') },
  ],
  'wedding-return-favours': [
    { src: '/assets/videos/catalog/wedding-return-favours-293C0077-EDDD-46E2-ADC0-D6D85A81199F.mp4', poster: catalogImage('IMG_0709') },
    { src: '/assets/videos/catalog/wedding-return-favours-IMG_3737.MOV', poster: catalogImage('IMG_0710') },
    { src: '/assets/images/IMG_4853.mov', poster: catalogImage('IMG_4846') },
  ],
  'birthday-return-favours': [
    { src: '/assets/videos/catalog/birthday-return-favours-79520BC9-2411-43E6-AE6A-1E6B970B6F39.mov', poster: catalogImage('IMG_0216') },
  ],
  'ring-platters': [
    { src: '/assets/videos/catalog/ring-platters-5a992c14103f4f6cb19b758453c6f9d2.mp4', poster: '/assets/images/optimized/ring-platters.webp' },
  ],
  'corporate-gifting-hampers': [
    { src: '/assets/videos/catalog/corporate-gifting-hampers-0ab7f7ca0bbd4cc5a1d10f671f553f08.mp4', poster: catalogImage('corporate-gifting-hampers-1') },
  ],
  'festival-gifting-hampers': [
    { src: '/assets/images/IMG_4549.mov', poster: catalogImage('IMG_4544') },
  ],
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
  { title: 'NI Square Packaging', description: 'Home and gifting inspiration', image: '/assets/images/optimized/hero-trousseau-curation-desktop.webp', href: '/', keywords: 'ni square packaging home hampers gifting' },
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
