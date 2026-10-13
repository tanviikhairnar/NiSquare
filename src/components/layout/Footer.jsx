import React from 'react';
import { Link } from 'react-router-dom';
import WhatsAppContactLink from '../WhatsAppContactLink';
import { storeCollections } from '../../data/storeCatalog';

const groups = [
  {
    title: 'Gifting categories',
    className: 'footer-category-links',
    links: storeCollections.map((collection) => ({
      label: collection.title,
      href: '/collections/' + collection.slug,
    })),
  },
  {
    title: 'Explore',
    links: [
      { label: 'Our story', href: '/pages/our-story' },
      { label: 'Services', href: '/pages/services' },
      { label: 'All gifting categories', href: '/collections' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Privacy policy', href: '/policies/privacy-policy' },
      { label: 'Terms of service', href: '/policies/terms-of-service' },
    ],
  },
];

const currentYear = new Date().getFullYear();
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about">
          <Link className="footer-brand" to="/">NI Square Packaging</Link>
          <h2>About</h2>
          <p>Explore our gifting categories, then connect with our founders on WhatsApp to plan a hamper around your occasion and preferences.</p>
          <WhatsAppContactLink
            className="footer-whatsapp-link"
            message="Hi, I’d like to explore your gifting categories and plan a hamper."
          >
            Plan a hamper
          </WhatsAppContactLink>
        </div>
        {groups.map((group) => (
          <nav
            className={'footer-links ' + (group.className || '')}
            aria-label={group.title}
            key={group.title}
          >
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <Link to={link.href} key={link.href}>{link.label}</Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {currentYear} NI Square Packaging</span>
        <span>Thoughtful gifting, planned personally.</span>
      </div>
    </footer>
  );
}


