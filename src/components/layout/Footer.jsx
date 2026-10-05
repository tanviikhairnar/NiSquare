import React from 'react';

const groups = [
  { title: 'Our services', links: [['Custom-made gifting', '/pages/services#services'], ['Personalised packaging', '/pages/services#services'], ['Return favours', '/pages/services#services'], ['Pre-booking', '/pages/services#services']] },
  { title: 'Occasions', links: [['Weddings', '/pages/services#occasions'], ['Birthdays', '/pages/services#occasions'], ['Baby celebrations', '/pages/services#occasions'], ['Corporate events', '/pages/services#occasions']] },
  { title: 'Help', links: [['Shipping Policy', '/policies/shipping-policy'], ['Refund and Exchange Policy', '/policies/refund-policy'], ['Privacy Policy', '/policies/privacy-policy'], ['Terms of Service', '/policies/terms-of-service']] },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about">
          <a className="footer-brand" href="/">NI Square Packaging</a>
          <h2>About</h2>
          <p>NI Square Packaging creates personalised hampers, custom gifts, and return favours for the occasions that matter. Contact us to plan yours.</p>
        </div>
        {groups.map((group) => (
          <nav className="footer-links" aria-label={group.title} key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 NI Square Packaging</span>
        <img src="https://cdn.shopify.com/s/files/1/0762/6286/7247/files/payment-strip.jpg?v=1741255633" alt="Accepted payment methods" loading="lazy" />
        <span>Packaging solutions for your business</span>
      </div>
    </footer>
  );
}