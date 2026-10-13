import React from 'react';
import WhatsAppContactLink from '../WhatsAppContactLink';
import { WHATSAPP_FOUNDERS } from '../../lib/whatsapp';

const founders = [
  {
    name: 'Nikita Kochar Ostwal',
    profession: 'Interior designer',
    image: '/assets/founders/nikita-kochar-ostwal.jpg',
    biography: [
      'I’m Nikita Kochar Ostwal, an interior designer by profession and a maker at heart. I’ve always loved creating things, trying out new ideas and turning simple ones into something beautiful.',
      'What got me hooked was seeing how something I made could bring a smile to someone’s face and make their day a little more special. That’s when I realised I was actually good at this, and that I loved doing it.',
      'I’ve always believed that details make all the difference. From choosing the right elements to adding the final touches, I like being involved in every part of the process.',
      'The part I enjoy most is taking someone’s ideas and vision and bringing them to life through design.',
      'What began as a love of making things has grown into creating personalised gifts that people treasure.',
    ],
  },
  {
    name: 'Nikita Anil Chordiya',
    profession: 'Textile designer',
    image: '/assets/founders/nikita-anil-chordiya.jpg',
    biography: [
      'I’m Nikita Anil Chordiya, a textile designer by profession, and design has always felt personal to me.',
      'Ever since I was a child, I’ve loved painting and making things. I notice things: colours, textures, patterns and all the small details most people miss. I used to put what I saw into paintings and sketches in my diary.',
      'Over the years, that habit of noticing has made its way into my work. Whether I’m designing, putting a hamper together, choosing textures, or working on the small details, I bring the same eye to everything I do.',
      'For me, design is about taking something simple and making it feel a little more special.',
      'That’s what I love most: turning everyday ideas into something people notice and enjoy.',
    ],
  },
];

const services = [
  { title: 'Custom-made gifting', description: 'Every hamper is made to suit your occasion, theme, preferences, and budget.' },
  { title: 'Handcrafted with care', description: 'Each gift is thoughtfully designed and put together by hand, making every hamper unique.' },
  { title: 'Occasion-based hampers', description: 'Hampers for weddings, birthdays, festivals, baby celebrations, corporate events, and more.' },
  { title: 'Personalised packaging', description: 'Packaging shaped around your theme, colour palette, and personal style.' },
  { title: 'Return favours', description: 'Personalised return gifts that thank your guests and stay in their memories.' },
  { title: 'Pre-booking required', description: 'Each order is made to order. Advance booking gives us time to plan, source, design, and prepare every detail.' },
];

const occasions = [
  'Weddings',
  'Birthdays',
  'Baby celebrations',
  'Festivals',
  'Corporate events',
  'Anniversaries',
  'Return favours',
  'And more',
];

export function CompanyIntroduction() {
  return (
    <section className="ni-home-section ni-introduction" id="about">
      <div className="ni-section-inner">
        <p className="ni-section-eyebrow">From our hands to your loved ones, with love</p>
        <h2 className="ni-section-title">About NI Square Packaging</h2>
        <div className="ni-introduction-copy">
          <p>NI Square Packaging is a gifting and packaging company. We make hampers, custom gifts, and return favours for every kind of occasion.</p>
          <p>With 1,000+ hampers behind us, we’ve created gifts for weddings, birthdays, baby celebrations, festivals, corporate events, anniversaries, and plenty of other milestones.</p>
          <p>We start by listening. Every hamper is built around the occasion, theme, budget, and personal taste. We select the gifts and packaging, add personal touches, and bring every detail together.</p>
          <p>We want a good gift to feel like an occasion in itself. Our job is to make the process simple and personal, and to make sure the final hamper feels right for the person receiving it.</p>
        </div>
        <ul className="ni-highlights" aria-label="About NI Square Packaging">
          <li><strong>1,000+</strong><span>Hampers created</span></li>
          <li><strong>Every occasion</strong><span>Gifts made for your moment</span></li>
          <li><strong>Personalised</strong><span>Made for your requirements</span></li>
          <li><strong>Handcrafted</strong><span>Finished with care</span></li>
        </ul>
      </div>
    </section>
  );
}

export function CompanyStory() {
  return (
    <section className="ni-home-section ni-story" id="our-story">
      <div className="ni-section-inner ni-story-layout">
        <div>
          <p className="ni-section-eyebrow">Two friends, one love of gifting</p>
          <h2 className="ni-section-title">The NI Square story</h2>
        </div>
        <div className="ni-story-copy">
          <p>NI Square Packaging was started by two best friends, both named Nikita, who share a love for gifting and good presentation.</p>
          <p>We’re a one-stop shop for gifting and packaging. From hampers to custom packaging, we make each gift feel personal and help you share love, thanks, and happiness in a way that feels right.</p>
          <p>From choosing the products to the final finishing touches, we take care of the details so you can enjoy the celebration.</p>
          <blockquote>People remember how a gift made them feel, long after they’ve forgotten what was inside.</blockquote>
        </div>
      </div>
    </section>
  );
}

export function FoundersSection({ showBiographies = true }) {
  return (
    <section className={`ni-home-section ni-founders${showBiographies ? '' : ' ni-founders--compact'}`} id="founders">
      <div className="ni-section-inner">
        <header className="ni-section-heading">
          <p className="ni-section-eyebrow">The people behind every detail</p>
          <h2 className="ni-section-title">Meet the founders</h2>
          {showBiographies && <p>Two best friends bringing their different design backgrounds and shared love of gifting to every hamper.</p>}
        </header>
        <div className="ni-founder-grid">
          {founders.map((founder) => (
            <article className="ni-founder-card" key={founder.name}>
              <div className="ni-founder-portrait">
                <img src={founder.image} alt={founder.name} loading="lazy" draggable="false" onContextMenu={(event) => event.preventDefault()} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
              </div>
              <div className="ni-founder-copy">
                <p className="ni-section-eyebrow">{founder.profession}</p>
                <h3>{founder.name}</h3>
                {showBiographies && founder.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <WhatsAppContactLink
                  className="ni-founder-phone"
                  message="Hi, I would like to plan a hamper."
                  founderPhone={WHATSAPP_FOUNDERS.find((contact) => contact.name === founder.name)?.phone}
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.4 11.7a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4.1a8.2 8.2 0 1 1 15.3-4.2Z" />
                    <path d="M9 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .3.1.4.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.5.8 1.2 1.4 2 1.8.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.3.4 0 .3-.2 1-.6 1.3-.4.4-1 .6-1.6.6-.5 0-1.2-.2-2-.5-1.5-.6-2.8-1.8-3.6-3-.6-.9-1-1.8-1-2.5 0-.6.2-1.1.5-1.4Z" />
                  </svg>
                  <span>Contact</span>
                </WhatsAppContactLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="ni-home-section ni-services" id="services">
      <div className="ni-section-inner">
        <header className="ni-section-heading">
          <p className="ni-section-eyebrow">Thought through, made by hand</p>
          <h2 className="ni-section-title">Services we offer</h2>
          <p>Every hamper is put together by hand, with attention to detail and your occasion in mind.</p>
        </header>
        <div className="ni-service-grid">
          {services.map((service, index) => (
            <article className="ni-service-card" key={service.title}>
              <span className="ni-service-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
        <p className="ni-booking-note">Every hamper is made especially for you. Please book in advance so we have time to plan and prepare it well.</p>
      </div>
    </section>
  );
}

export function OccasionsSection() {
  return (
    <section className="ni-home-section ni-occasions" id="occasions">
      <div className="ni-section-inner ni-occasions-layout">
        <div>
          <p className="ni-section-eyebrow">January to December</p>
          <h2 className="ni-section-title">We’ve got your gifting covered</h2>
        </div>
        <div className="ni-occasions-copy">
          <p>From New Year to Christmas and every celebration in between, NI Square Packaging takes the stress out of gifting.</p>
          <p>We shape the selection, customisation, packaging, and finishing touches around your occasion and what you need. Tell us what you have in mind and we’ll take care of the rest.</p>
          <ul className="ni-occasion-list">
            {occasions.map((occasion) => <li key={occasion}>{occasion}</li>)}
          </ul>
          <WhatsAppContactLink className="button" message="Hi, I would like to plan a hamper.">Tell us what you have in mind</WhatsAppContactLink>
        </div>
      </div>
    </section>
  );
}






