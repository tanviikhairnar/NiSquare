import React from 'react';
import WhatsAppContactLink from '../WhatsAppContactLink';

export default function CompanyBanner() {
  return (
    <section className="company-banner ni-company-banner" aria-label="NI Square Packaging gifting">
      <div className="ni-company-banner-inner">
        <p className="ni-section-eyebrow">Made for every occasion</p>
        <h2>1,000+ hampers, made personal</h2>
        <p>From the first idea to the finishing touches, we’ll help bring your gift together.</p>
        <WhatsAppContactLink className="ni-company-banner-link" message="Hi, I would like to plan a hamper.">Plan a hamper</WhatsAppContactLink>
      </div>
    </section>
  );
}
