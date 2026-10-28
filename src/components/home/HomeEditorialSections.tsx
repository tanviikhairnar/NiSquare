import { Link } from 'react-router-dom';
import AnimatedCounter from '../common/AnimatedCounter';

interface TrustPoint {
  value: string;
  label: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

interface Reason {
  title: string;
  description: string;
}

const trustPoints: TrustPoint[] = [
  { value: '1,000+', label: 'Hampers created' },
  { value: 'Made by hand', label: 'Finished with care' },
  { value: 'Made for you', label: 'Personalised gifting' },
  { value: 'By two founders', label: 'Personal from start to finish' },
];

const processSteps: ProcessStep[] = [
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

const reasons: Reason[] = [
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

export function HomeTrustStrip() {
  return (
    <section className="home-trust-strip" aria-label="NI Square Packaging at a glance">
      <div className="home-trust-strip-inner">
        {trustPoints.map((point) => (
          <div className="home-trust-item" key={point.value}>
            <strong>
              {point.value === '1,000+' || point.label === 'Hampers created' ? (
                <AnimatedCounter end={1000} duration={2000} suffix="+" />
              ) : (
                point.value
              )}
            </strong>
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
          <p className="ni-section-eyebrow">From first idea to finishing touch</p>
          <h2 className="ni-section-title" id="home-process-title">How we work</h2>
          <p>A clear, personal process gives us time to make every detail feel right.</p>
        </header>
        <ol className="home-process-grid">
          {processSteps.map((step, index) => (
            <li className="home-process-card" key={step.title}>
              <div className="home-process-card-top">
                <span className="home-process-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
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
      <div className="ni-decoration-layer" aria-hidden="true">
        <img
          src="/assets/decorations/bird-flying.webp"
          alt=""
          className="ni-motif motif-tl-bird-flying"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/assets/decorations/botanical-branch-curved.webp"
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

