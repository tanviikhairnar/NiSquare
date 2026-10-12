import React from 'react';
import WhatsAppContactLink from '../WhatsAppContactLink';

export default function Newsletter() {
  return <section className="newsletter-section"><div className="newsletter-copy"><p className="eyebrow">A little something for you</p><h2>Stay in touch with NI Square Packaging</h2><p>Have an idea for a gift? Start a WhatsApp chat with our founders.</p></div><WhatsAppContactLink className="button" message="Hi, I would like to hear more about your hampers.">Chat on WhatsApp</WhatsAppContactLink></section>;
}
