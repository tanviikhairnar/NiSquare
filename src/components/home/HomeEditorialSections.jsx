import React from 'react';
import { Link } from 'react-router-dom';
import { collectionPath, storeCollections } from '../../data/storeCatalog';

const trustPoints = [
  { value: '1,000+', label: 'Hampers created' },
  { value: 'Made by hand', label: 'Finished with care' },
  { value: 'Made for you', label: 'Personalised gifting' },
  { value: 'By two founders', label: 'Personal from start to finish' },
];

const processSteps = [
  {
    title: 'Tell us about your occasion',
    description: 'Share the celebration, theme, preferences, and budget you have in mind.',
  },
  {
    title: 'Shape your hamper',
    description: 'We bring together a considered selection of gifts, colours, and packaging.',
  },
  {
    title: 'Approve the design',
    description: 'Review your custom design mockup before we begin preparing the order.',
  },
  {
    title: 'We finish every detail',
    description: 'Your hamper is assembled by hand and prepared for dispatch with care.',
  },
];

const processIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 7.6 7.6 0 0 1-3.2-.7L4 20l1.7-4.6a7.5 7.5 0 1 1 14.3-3.9Z" />
    <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 9h17v11h-17zM2.5 6h19v3h-19zM12 6v14" />
    <path d="M12 6H8.3a2 2 0 1 1 1.9-2.6L12 6Zm0 0h3.7a2 2 0 1 0-1.9-2.6L12 6Z" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3.5h9l4 4V20H6zM15 3.5V8h4M9 12h6M9 15h3" />
    <path d="m13.5 17 1.5 1.5 3-3" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3.5 7.5 8.5-4 8.5 4v9l-8.5 4-8.5-4zM3.5 7.5l8.5 4 8.5-4M12 11.5v9M8 5.4l8.5 4" />
  </svg>,
];
const reasons = [
  {
    title: 'Design-led founders',
    description: 'Interior and textile design experience guide the way we approach each detail.',
  },
  {
    title: 'Made around your moment',
    description: 'Themes, colours, preferences, and budgets shape every custom hamper.',
  },
  {
    title: 'Hand-finished details',
    description: 'Each order is put together by hand, so every gift feels considered and personal.',
  },
  {
    title: 'Personal and corporate gifting',
    description: 'We create for family celebrations, wedding traditions, teams, and company events.',
  },
];

const showcaseCollections = [
  {
    collection: storeCollections[0],
    images: ['/assets/images/optimized/catalog/IMG_2897-3.webp', '/assets/images/optimized/catalog/IMG_4525.webp'],
  },
  {
    collection: storeCollections[1],
    images: ['/assets/images/optimized/catalog/IMG_1151.webp', '/assets/images/optimized/catalog/IMG_3596.webp'],
  },
  {
    collection: storeCollections[2],
    images: ['/assets/images/optimized/catalog/IMG_2149.webp', '/assets/images/optimized/catalog/IMG_0035.webp'],
  },
];

export function HomeTrustStrip() {
  return (
    <section className="home-trust-strip" aria-label="NI Square Packaging at a glance">
      <div className="home-trust-strip-inner">
        {trustPoints.map((point) => (
          <div className="home-trust-item" key={point.value}>
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeAboutSection() {
  return (
    <section className="ni-home-section home-about" id="about" aria-labelledby="home-about-title">
      <div className="ni-section-inner home-about-layout">
        <figure className="home-editorial-photo home-about-photo">
          <img
            src="/assets/images/optimized/catalog/IMG_1167.webp"
            alt="A wedding trousseau display styled with flowers, pearls, and personalised details"
            loading="eager"
            decoding="async"
          />
          <figcaption>Made thoughtfully, from the first detail to the final finish</figcaption>
        </figure>
        <div className="home-about-copy">
          <p className="ni-section-eyebrow">A little about us</p>
          <h2 className="ni-section-title" id="home-about-title">Thoughtful gifting, made personal</h2>
          <p>NI Square began with two best friends named Nikita and a shared love for thoughtful gifting.</p>
          <p>We bring together gifts, colours, and packaging to suit each occasion, then finish every detail by hand.</p>
          <Link className="home-editorial-link" to="/pages/our-story">Meet the people behind NI Square <span aria-hidden="true">&#8599;</span></Link>
        </div>
      </div>
    </section>
  );
}

export function HowWeWorkSection() {
  return (
    <section className="ni-home-section home-process" aria-labelledby="home-process-title">
      <div className="ni-section-inner">
        <header className="ni-section-heading">
          <p className="ni-section-eyebrow">From first idea to finishing touch</p>
          <h2 className="ni-section-title" id="home-process-title">How we work</h2>
          <p>A clear, personal process gives us time to make every detail feel right.</p>
        </header>
        <ol className="home-process-grid">
          {processSteps.map((step, index) => (
            <li className="home-process-card" key={step.title}>
              <div className="home-process-card-top">
                <span className="home-process-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="home-process-icon" aria-hidden="true">{processIcons[index]}</span>
              </div>
              <p className="home-process-step-label">Step {String(index + 1).padStart(2, '0')}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="ni-home-section home-why-choose" aria-labelledby="home-why-title">
      <div className="ni-section-inner home-why-layout">
        <div className="home-why-copy">
          <p className="ni-section-eyebrow">The care behind every hamper</p>
          <h2 className="ni-section-title" id="home-why-title">Personal touches, thoughtfully brought together</h2>
          <ul className="home-why-list">
            {reasons.map((reason) => (
              <li className="home-why-item" key={reason.title}>
                <span className="home-why-mark" aria-hidden="true">&#10003;</span>
                <span>
                  <strong>{reason.title}</strong>
                  <span>{reason.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="home-editorial-photo home-why-photo">
          <img
            src="/assets/images/optimized/catalog/IMG_4525.webp"
            alt="Personalised wedding hampers arranged with custom names and finishing details"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Personalised for the people and moments that matter</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function HomePortfolioSection() {
  return (
    <section className="ni-home-section home-portfolio" aria-labelledby="home-portfolio-title">
      <div className="ni-section-inner">
        <header className="ni-section-heading home-portfolio-heading">
          <p className="ni-section-eyebrow">A closer look at our work</p>
          <h2 className="ni-section-title" id="home-portfolio-title">Thoughtful gifting, made personal</h2>
          <p>Explore a few of the occasions and details we love bringing together.</p>
        </header>
        <div className="home-portfolio-grid">
          {showcaseCollections.map(({ collection, images }, index) => (
            <article className="home-portfolio-card" key={collection.slug}>
              <div className="home-portfolio-images">
                <img
                  className="home-portfolio-image-main"
                  src={collection.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div className="home-portfolio-image-details" aria-hidden="true">
                  {images.map((image) => <img src={image} alt="" loading="lazy" decoding="async" key={image} />)}
                </div>
                <span className="home-portfolio-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="home-portfolio-copy">
                <p>Featured collection</p>
                <h3>{collection.title}</h3>
                <p className="home-portfolio-description">{collection.description}</p>
                <Link to={collectionPath(collection.slug)} aria-label={`Explore ${collection.title}`}>
                  Explore collection <span aria-hidden="true">&#8594;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
