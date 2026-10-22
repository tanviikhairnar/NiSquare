import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PageTitle from '../components/common/PageTitle';
import WhatsAppContactLink from '../components/WhatsAppContactLink';

const founders = ['Nikita Kochar Ostwal', 'Nikita Anil Chordiya'];

export default function ContactPage() {
  return (
    <section className="store-page">
      <div className="store-page-inner store-page-inner--narrow">
        <Breadcrumbs current="Contact" />
        <PageTitle
          eyebrow="We are here to help"
          title="Chat with our founders"
          description="Questions about a product, gift, or order? Share a few details and message us on WhatsApp."
        />
        <div className="store-contact-layout">
          <div>
            <h2>Plan something personal</h2>
            <p>Tell us about your occasion, then choose a founder to continue on WhatsApp.</p>
          </div>
          <div className="store-contact-actions">
            {founders.map((name) => (
              <WhatsAppContactLink className="button" key={name} message="Hi, I would like to plan a hamper.">
                Message {name}
              </WhatsAppContactLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

