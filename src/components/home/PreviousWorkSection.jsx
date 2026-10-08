import React, { useRef } from 'react';

const previousWorkImages = [
  'https://static.zegsuapps.com/user-data/instagenie/7f1a4f21fc34ca992141368cb2f053934200919f.webp',
  'https://static.zegsuapps.com/user-data/instagenie/23f624623b7facd862ce500baef737676ef24235.webp',
  'https://static.zegsuapps.com/user-data/instagenie/3efe41f1d63dbb4645ec5381ee5bd5da0ceb8acf.webp',
  'https://static.zegsuapps.com/user-data/instagenie/b0b23238d54b8a0255b5c790083c0714264428d9.webp',
  'https://static.zegsuapps.com/user-data/instagenie/c376b865953a4356dedc8c8e8627eed87b667dd1.webp',
];

const instagramProfile = 'https://www.instagram.com/nisquarepackaging/';

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
          <p className="previous-work-eyebrow">From our studio to your feed</p>
          <h2 id="previous-work-heading">Seen on Instagram Reels</h2>
          <p className="previous-work-description">
            A closer look at the hampers, thoughtful details, and celebrations we bring together by hand.
          </p>
          <a className="previous-work-instagram" href={instagramProfile} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle className="instagram-icon-dot" cx="17.7" cy="6.6" r=".9" />
            </svg>
            <span>Follow @nisquarepackaging</span>
            <span aria-hidden="true">↗</span>
          </a>
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
          <a
            className="previous-work-card"
            key={image}
            href={instagramProfile}
            target="_blank"
            rel="noreferrer"
            aria-label={'View NI Square Packaging work on Instagram, preview ' + (index + 1)}
          >
            <img
              src={image}
              alt={'NI Square Packaging handcrafted gifting project ' + (index + 1)}
              loading="lazy"
            />
            <span className="previous-work-reel-badge">Instagram</span>
            <span className="previous-work-reel-instagram" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle className="instagram-icon-dot" cx="17.7" cy="6.6" r=".9" />
              </svg>
            </span>
            <span className="previous-work-reel-caption">Watch on Instagram</span>
          </a>
        ))}
      </div>
      <div className="previous-work-footer">
        <a className="previous-work-link" href="/pages/contact">Plan a custom project</a>
      </div>
    </section>
  );
}
