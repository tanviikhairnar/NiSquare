import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const moments = [
  {
    number: '01',
    title: 'It starts with your story.',
    copy: 'Tell us who you are celebrating, what the moment means, and how you want them to feel.',
    image: '/assets/instagram-reels/DQcPTtYgvTY.jpg',
    imageAlt: 'A personalised celebration hamper, finished with flowers and warm lights',
  },
  {
    number: '02',
    title: 'We gather the little details.',
    copy: 'We choose thoughtful pieces, colours, textures, and personal touches around your occasion and budget.',
    image: '/assets/instagram-reels/DRM51Y8En-f.jpg',
    imageAlt: 'A handcrafted wedding return gift in rich red and antique gold',
  },
  {
    number: '03',
    title: 'Then make it feel like yours.',
    copy: 'From the packaging to the ribbon, each detail is brought together by hand to suit your idea.',
    image: '/assets/instagram-reels/DP3OMVrEhOA.jpg',
    imageAlt: 'A floral gift box with handmade fabric and ribbon details',
  },
  {
    number: '04',
    title: 'Ready for their moment.',
    copy: 'We finish every hamper with care, so opening it feels like part of the celebration.',
    image: '/assets/instagram-reels/DQB1R3MEvle.jpg',
    imageAlt: 'A festive gifting arrangement finished with marigolds and personal details',
  },
];

export default function GiftJourneySection() {
  const [activeMoment, setActiveMoment] = useState(0);
  const momentRefs = useRef([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Number(entry.target.dataset.momentIndex);
        if (Number.isInteger(index)) setActiveMoment(index);
      });
    }, { rootMargin: '-38% 0px -38% 0px', threshold: 0 });

    momentRefs.current.forEach((moment) => moment && observer.observe(moment));
    return () => observer.disconnect();
  }, []);

  const active = moments[activeMoment];

  return (
    <section className="ni-gift-journey" aria-labelledby="ni-gift-journey-title">
      <div className="ni-gift-journey-inner">
        <div className="ni-gift-journey-feature">
          <p className="ni-gift-journey-eyebrow">Made slowly, made personal</p>
          <h2 id="ni-gift-journey-title">A little thought in every layer.</h2>
          <p className="ni-gift-journey-intro">A glimpse into how your idea becomes a gift they remember.</p>

          <div className="ni-gift-journey-stage" role="img" aria-label={active.imageAlt}>
            {moments.map((moment, index) => (
              <img
                key={moment.image}
                className={'ni-gift-journey-image' + (index === activeMoment ? ' is-active' : '')}
                src={moment.image}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
              />
            ))}
            <span className="ni-gift-journey-seal" aria-hidden="true">Made<br />by hand</span>
            <div className="ni-gift-journey-caption" aria-live="polite">
              <span>{active.number} <i> / </i> 04</span>
              <strong key={active.number}>{active.title}</strong>
            </div>
          </div>

          <div className="ni-gift-journey-progress" aria-hidden="true">
            <span>{active.number}</span>
            <span className="ni-gift-journey-progress-track"><i style={{ width: `${((activeMoment + 1) / moments.length) * 100}%` }} /></span>
            <span>04</span>
          </div>
          <Link className="ni-gift-journey-link" to="/pages/contact">
            Let's make something personal
            <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M5 15 15 5M7 5h8v8" /></svg>
          </Link>
        </div>

        <div className="ni-gift-journey-steps" aria-label="How we make your hamper">
          {moments.map((moment, index) => (
            <article
              className={'ni-gift-journey-step' + (index === activeMoment ? ' is-active' : '')}
              data-moment-index={index}
              key={moment.number}
              ref={(node) => { momentRefs.current[index] = node; }}
              aria-current={index === activeMoment ? 'step' : undefined}
            >
              <img className="ni-gift-journey-step-photo" src={moment.image} alt="" loading="lazy" aria-hidden="true" />
              <span className="ni-gift-journey-step-number">{moment.number}</span>
              <div>
                <h3>{moment.title}</h3>
                <p>{moment.copy}</p>
              </div>
              <span className="ni-gift-journey-step-mark" aria-hidden="true">+</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
