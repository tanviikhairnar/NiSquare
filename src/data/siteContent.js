/**
 * Centralized Site Content & Configuration for NI Square Packaging
 * 
 * Replace or customize copy and images here without modifying component markup.
 */

import { storeCollections } from './storeCatalog';

const subcategoryAnchor = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const giftingMenu = storeCollections.map((collection) => ({
  heading: collection.title,
  headingPath: '/collections/' + collection.slug,
  items: collection.subcategories.map((subcategory) => ({
    label: subcategory.title,
    path: '/collections/' + collection.slug + '#subcategory-' + subcategoryAnchor(subcategory.title),
  })),
}));

export const siteHeader = {
  brandName: 'NI Square Packaging',
  logoImage: '/assets/logo/NI_Square_Maroon__1_-removebg-preview.png',
  logoAlt: 'NI Square Packaging',
  navLinks: [
    { label: 'Home', path: '/' },
    {
      label: 'Gifting',
      path: '/collections',
      hasMegaMenu: true,
      megaMenu: giftingMenu,
    },
    { label: 'Our Story', path: '/pages/our-story' },
    {
      label: 'Services',
      path: '/pages/services#services',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Custom-made gifting', path: '/pages/services#services' },
        { label: 'Personalised packaging', path: '/pages/services#services' },
        { label: 'Pre-booking information', path: '/pages/services#services' },
      ],
    },
    { label: 'Contact', path: '/pages/contact' },
  ],
};

export const heroContent = {
  // Hero Typography
  subtitle: 'NI Square Packaging',
  title: 'From our hands to your loved ones, with love.',
  ctaText: 'Plan a hamper',
  ctaLink: '/pages/contact',

  // High-Resolution Media
  // Leave empty ("") to render the neutral dimensions placeholder,
  // or set your custom banner path.
  desktopImage: '/assets/images/pexels-cottonbro-6832992.jpg',
  mobileImage: '/assets/images/pexels-cottonbro-6832992.jpg',
  imageAlt: 'Thoughtful hampers and personalised gifts',
};


