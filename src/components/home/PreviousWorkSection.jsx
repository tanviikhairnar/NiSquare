import React, { useRef } from 'react';

const previousWorkImages = [
  'https://static.zegsuapps.com/user-data/instagenie/7f1a4f21fc34ca992141368cb2f053934200919f.webp',
  'https://static.zegsuapps.com/user-data/instagenie/23f624623b7facd862ce500baef737676ef24235.webp',
  'https://static.zegsuapps.com/user-data/instagenie/3efe41f1d63dbb4645ec5381ee5bd5da0ceb8acf.webp',
  'https://static.zegsuapps.com/user-data/instagenie/b0b23238d54b8a0255b5c790083c0714264428d9.webp',
  'https://static.zegsuapps.com/user-data/instagenie/c376b865953a4356dedc8c8e8627eed87b667dd1.webp',
];

export default function PreviousWorkSection() {
  const galleryRef = useRef(null);

  const scrollGallery = (direction) => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gallery.scrollBy({
      left: direction * Math.max(gallery.clientWidth * 0.72, 240),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="previous-work-section" aria-labelledby="previous-work-heading">
      <div className="previous-work-heading">
        <div className="previous-work-copy">
          <p className="previous-work-eyebrow">Selected work</p>
          <h2 id="previous-work-heading">Gifts made for your moments</h2>
          <p className="previous-work-description">
            A look at the thoughtful hampers, packaging, and celebration gifts we create by hand.
          </p>
        </div>
        <div className="previous-work-controls" aria-label="Previous work gallery controls">
          <button type="button" onClick={() => scrollGallery(-1)} aria-label="Show previous projects">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" onClick={() => scrollGallery(1)} aria-label="Show next projects">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      <div
        className="previous-work-track"
        ref={galleryRef}
        role="region"
        aria-label="Previous gifting and packaging projects"
        tabIndex={0}
      >
        {previousWorkImages.map((image, index) => (
          <figure className="previous-work-card" key={image}>
            <img
              src={image}
              alt={'NI Square Packaging project ' + (index + 1)}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
      <div className="previous-work-footer">
        <a className="previous-work-link" href="/pages/contact">Plan a custom project</a>
      </div>
    </section>
  );
}