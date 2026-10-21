import React from 'react';
import { Link } from 'react-router-dom';
import WhatsAppContactLink from '../WhatsAppContactLink';
import { storeCollections } from '../../data/storeCatalog';
import { WHATSAPP_FOUNDERS } from '../../lib/whatsapp';

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
      { label: 'Terms & Conditions', href: '/policies/terms-of-service' },
    ],
  },
];

const currentYear = new Date().getFullYear();
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about">
          <Link className="footer-brand" to="/">
            <img src="/assets/logo/NI%20square%20cream%20revised%20(2).png" alt="NI Square Packaging" />
          </Link>
          <h2>About</h2>
          <p>Explore our gifting categories, then connect with our founders on WhatsApp to plan a hamper around your occasion and preferences.</p>
          <WhatsAppContactLink
            className="footer-whatsapp-link"
            message="Hi, I would like to explore your gifting categories and plan a hamper."
          >
            Plan a hamper
          </WhatsAppContactLink>
        </div>
        <div className="footer-contact">
          <h2>Contact</h2>
          <address className="footer-contact-address">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>Nashik District, Maharashtra, India</span>
          </address>
          <div className="footer-founder-contacts">
            {WHATSAPP_FOUNDERS.map((founder) => (
              <a
                className="footer-founder-contact"
                href={'tel:+91' + founder.phone}
                aria-label={'Call ' + founder.name + ' at +91 ' + founder.phone}
                key={founder.phone}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2c1.1.4 2.3.6 3.6.6a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A18 18 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.6 3.6a1 1 0 0 1-.2 1Z" />
                </svg>
                <span>
                  <span>{founder.name}</span>
                  <strong>+91 {founder.phone.slice(0, 5)} {founder.phone.slice(5)}</strong>
                </span>
              </a>
            ))}
          </div>
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
        <span>&copy; {currentYear} NI Square Packaging</span>
        <span>Thoughtful gifting, planned personally.</span>
      </div>
    </footer>
  );
}
