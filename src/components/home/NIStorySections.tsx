import React from 'react';
import WhatsAppContactLink from '../WhatsAppContactLink';
import { SolidWhatsAppIcon } from '../common/Icons';
import { WHATSAPP_FOUNDERS } from '../../lib/whatsapp';

interface FounderBio {
  name: string;
  profession: string;
  image: string | null;
  biography: string[];
}

interface ServiceItem {
  title: string;
  description: string;
}

const founders: FounderBio[] = [
  {
    name: 'Nikita Kochar Ostwal',
    profession: 'Interior designer',
    image: null,
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
    image: null,
    biography: [
      'I’m Nikita Anil Chordiya, a textile designer by profession, and design has always felt personal to me.',
      'Ever since I was a child, I’ve loved painting and making things. I notice things: colours, textures, patterns and all the small details most people miss. I used to put what I saw into paintings and sketches in my diary.',
      'Over the years, that habit of noticing has made its way into my work. Whether I’m designing, putting a hamper together, choosing textures, or working on the small details, I bring the same eye to everything I do.',
      'For me, design is about taking something simple and making it feel a little more special.',
      'That’s what I love most: turning everyday ideas into something people notice and enjoy.',
    ],
  },
];

const services: ServiceItem[] = [
  { title: 'Custom-made gifting', description: 'Every hamper is made to suit your occasion, theme, preferences, and budget.' },
  { title: 'Handcrafted with care', description: 'Each gift is thoughtfully designed and put together by hand, making every hamper unique.' },
  { title: 'Occasion-based hampers', description: 'Hampers for weddings, birthdays, festivals, baby celebrations, corporate events, and more.' },
  { title: 'Personalised packaging', description: 'Packaging shaped around your theme, colour palette, and personal style.' },
  { title: 'Return favours', description: 'Personalised return gifts that thank your guests and stay in their memories.' },
  { title: 'Pre-booking required', description: 'Each order is made to order. Advance booking gives us time to plan, source, design, and prepare every detail.' },
];

const occasions: string[] = [
  'Weddings',
  'Birthdays',
  'Baby celebrations',
  'Festivals',
  'Corporate events',
  'Anniversaries',
  'Return favours',
  'And more',
];

export function CompanyStory() {
  return (
    <section className="ni-home-section ni-story" id="our-story">
      <div className="ni-decoration-layer" aria-hidden="true">
        <img
          src="/assets/decorations/botanical-bloom-upright.webp"
          alt=""
          className="ni-motif story-motif-bloom"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="ni-section-inner">
        <div className="ni-section-heading ni-story-header">
          <p className="ni-section-eyebrow">Two friends, one love of gifting</p>
          <h2 className="ni-section-title">The NI Square story</h2>
        </div>
        <div className="ni-story-body">
          <p className="ni-story-lead">
            NI Square began with two best friends named Nikita and a shared love for thoughtful gifting and presentation.
          </p>
          <div className="ni-story-columns">
            <p>From personalized hampers to bespoke packaging, we make each gift feel personal and help you share love, appreciation, and celebration in a way that feels intentional.</p>
            <p>With 1,000+ hampers created for weddings, birthdays, baby celebrations, festivals, corporate milestones, and anniversaries, we handle every detail from curation to the final hand-finished touches.</p>
          </div>
          <blockquote className="ni-story-quote">
            <span className="ni-story-quote-mark" aria-hidden="true">“</span>
            <p>People remember how a gift made them feel, long after they’ve forgotten what was inside.</p>
          </blockquote>
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

export function FoundersSection({ showBiographies = true }: { showBiographies?: boolean }) {
  return (
    <section className={`ni-home-section ni-founders${showBiographies ? '' : ' ni-founders--compact'}`} id="founders">
      <div className="ni-decoration-layer" aria-hidden="true">
        <img
          src="/assets/decorations/bird-perched.webp"
          alt=""
          className="ni-motif founders-motif-bird"
          loading="lazy"
          decoding="async"
        />
      </div>
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
                {founder.image && <img src={founder.image} alt={founder.name} loading="lazy" decoding="async" draggable="false" onContextMenu={(event) => event.preventDefault()} onError={(event) => { (event.currentTarget as HTMLElement).style.display = 'none'; }} />}
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
                  <SolidWhatsAppIcon />
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
      <div className="ni-decoration-layer" aria-hidden="true">
        <img
          src="/assets/decorations/botanical-bloom-hanging.webp"
          alt=""
          className="ni-motif services-motif-hanging-bloom"
          loading="lazy"
          decoding="async"
        />
      </div>
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

