/**
 * Centralized Site Content & Configuration for NI Square Packaging
 * 
 * Replace or customize copy and images here without modifying component markup.
 */

import { storeCollections, subcategoryPath } from './storeCatalog';

const giftingMenu = storeCollections.map((collection) => ({
  heading: collection.title,
  headingPath: '/collections/' + collection.slug,
  items: collection.subcategories.map((subcategory) => ({
    label: subcategory.title,
    path: subcategoryPath(collection.slug, subcategory.title),
  })),
}));

export const siteHeader = {
  brandName: 'NI Square Packaging',
  logoImage: '/assets/logo/NI%20square%20cream%20revised%20(2).png',
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
};


