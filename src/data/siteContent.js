/**
 * Centralized Site Content & Configuration for NI Square Packaging
 * 
 * Replace or customize copy and images here without modifying component markup.
 */

export const siteHeader = {
  brandName: 'NI Square Packaging',
  logoImage: '',
  logoAlt: 'NI Square Packaging',
  navLinks: [
    { label: 'Home', path: '/' },
    {
      label: 'Gifting',
      path: '/pages/services#occasions',
      hasMegaMenu: true,
      megaMenu: [
        {
          heading: 'Gifting services',
          headingPath: '/pages/services#services',
          items: [
            { label: 'Custom-made hampers', path: '/pages/services#services' },
            { label: 'Personalised packaging', path: '/pages/services#services' },
            { label: 'Custom gifts', path: '/pages/services#services' },
            { label: 'Return favours', path: '/pages/services#services' },
          ],
        },
        {
          heading: 'Occasions',
          headingPath: '/pages/services#occasions',
          items: [
            { label: 'Weddings and anniversaries', path: '/pages/services#occasions' },
            { label: 'Birthdays', path: '/pages/services#occasions' },
            { label: 'Baby celebrations', path: '/pages/services#occasions' },
            { label: 'Festivals and corporate events', path: '/pages/services#occasions' },
          ],
        },
      ],
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
  desktopImage: '//www.studio13.co.in/cdn/shop/files/home-page-banner-01.jpg?v=1725276693&width=3200',
  mobileImage: '//www.studio13.co.in/cdn/shop/files/banner_4_mob.jpg?v=1741689853&width=1200',
  imageAlt: 'Thoughtful hampers and personalised gifts',
};

