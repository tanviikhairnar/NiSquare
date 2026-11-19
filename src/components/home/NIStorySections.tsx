import WhatsAppContactLink from '../WhatsAppContactLink';
import { SolidWhatsAppIcon } from '../common/Icons';
import AnimatedCounter from '../common/AnimatedCounter';
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
  {
    title: 'Custom-made gifting',
    description: 'Every gifting idea starts somewhere. Share your occasion, preferences and budget with us, and we’ll help bring together a hamper that reflects exactly what you have in mind.',
  },
  {
    title: 'Handcrafted with care',
    description: 'A beautiful presentation comes down to the details. Each creation is carefully assembled, arranged and finished to bring the complete gifting experience together.',
  },
  {
    title: 'Occasion-based hampers',
    description: 'From wedding celebrations and birthdays to baby showers, festivals and corporate occasions, discover gifting ideas suited to the moments worth celebrating.',
  },
  {
    title: 'Personalised packaging',
    description: 'Make the presentation your own with thoughtfully selected colours, packaging styles, ribbons and finishing details that complement your celebration.',
  },
  {
    title: 'Return favours',
    description: 'Thank your guests with beautifully presented favours that become a small but memorable part of their celebration experience.',
  },
  {
    title: 'Made to order',
    description: 'Every creation begins with a plan. Advance booking allows us to discuss your requirements, arrange the selections and prepare your gifting pieces with the attention they deserve.',
  },
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
          src="/assets/decorations/bird-flying.webp"
          alt=""
          className="ni-motif motif-tl-bird-flying"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/assets/decorations/botanical-foliage-sprig.webp"
          alt=""
          className="ni-motif motif-tl-sprig"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/assets/decorations/stardust-constellation-a.webp"
          alt=""
          className="ni-motif motif-br-stardust"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/assets/decorations/botanical-bloom-upright.webp"
          alt=""
          className="ni-motif motif-br-bloom-upright"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="ni-section-inner">
        <header className="ni-section-heading ni-story-header">
          <p className="ni-section-eyebrow">The story behind NI²</p>
          <h2 className="ni-section-title">A shared idea, brought to life through the art of gifting.</h2>
          <p className="ni-story-lead">
            NI² Packaging began with two best friends, both named Nikita, and a shared appreciation for thoughtful gifting and beautiful presentation.
          </p>
        </header>
        <div className="ni-story-body">
          <div className="ni-story-grid">
            <div className="ni-story-col">
              <p>What makes a gift memorable isn’t always its size or price. Sometimes, it’s the thought behind the selection, the way everything comes together, or the little detail that makes someone feel remembered.</p>
              <p>This belief is at the heart of NI². From wedding trousseau trunks and customised invitations to celebration hampers, floral gifting and personalised packaging, our work revolves around making each gifting experience feel considered and complete.</p>
            </div>
            <div className="ni-story-col">
              <p>We see packaging as more than an outer layer. It’s the first impression, the anticipation of opening something special and a part of the memory that stays long after the occasion.</p>
              <p>Every creation gives us an opportunity to bring someone’s idea to life, one detail at a time.</p>
            </div>
          </div>
          <blockquote className="ni-story-quote">
            <span className="ni-quote-label">Our belief</span>
            <p>
              <span className="ni-quote-mark" aria-hidden="true">“</span>
              We believe thoughtful gifting is an expression of connection. It’s a way to celebrate people, honour traditions, appreciate relationships and make ordinary gestures feel meaningful.
              <span className="ni-quote-mark" aria-hidden="true">”</span>
            </p>
          </blockquote>
        </div>
        <ul className="ni-highlights" aria-label="About NI Square Packaging">
          <li>
            <strong>
              <AnimatedCounter end={1000} duration={2000} suffix="+" />
            </strong>
            <span>Hampers created</span>
          </li>
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
          <h2 className="ni-section-title">Meet the minds and hands behind NI².</h2>
          <p>Two perspectives, one shared passion for creating gifting experiences that bring people closer.</p>
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
                  className="button ni-founder-phone"
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
          className="ni-motif motif-tl-bloom-hanging"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/assets/decorations/stardust-constellation-b.webp"
          alt=""
          className="ni-motif motif-br-stardust-perched"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/assets/decorations/bird-perched.webp"
          alt=""
          className="ni-motif motif-br-bird-perched"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="ni-section-inner">
        <header className="ni-section-heading">
          <p className="ni-section-eyebrow">Services we offer</p>
          <h2 className="ni-section-title">The many ways we make gifting special.</h2>
          <p>From the gift selection to the way it is presented, every part of the experience is considered to suit your occasion.</p>
        </header>
        <div className="ni-service-grid">
          {services.map((service) => (
            <article className="ni-service-card" key={service.title}>
              <h3 className="ni-service-title">
                <img
                  src="/assets/logo/ni-square-emblem-gold.webp"
                  alt=""
                  className="ni-service-bullet"
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                <span>{service.title}</span>
              </h3>
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

