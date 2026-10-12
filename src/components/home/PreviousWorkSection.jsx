import React from 'react';
import WhatsAppContactLink from '../WhatsAppContactLink';

const previousWorkReels = [
  {
    id: 'DTfb2PBkj8-',
    url: 'https://www.instagram.com/reel/DTfb2PBkj8-/',
    image: '/assets/instagram-reels/DTfb2PBkj8-.jpg',
    video: null,
    label: 'Meet the founders',
  },
  {
    id: 'DRM51Y8En-f',
    url: 'https://www.instagram.com/reel/DRM51Y8En-f/',
    image: '/assets/instagram-reels/DRM51Y8En-f.jpg',
    video: null,
    label: 'Wedding return gifts',
  },
  {
    id: 'DQcPTtYgvTY',
    url: 'https://www.instagram.com/reel/DQcPTtYgvTY/',
    image: '/assets/instagram-reels/DQcPTtYgvTY.jpg',
    video: null,
    label: 'Invitations made personal',
  },
  {
    id: 'DQB1R3MEvle',
    url: 'https://www.instagram.com/reel/DQB1R3MEvle/',
    image: '/assets/instagram-reels/DQB1R3MEvle.jpg',
    video: null,
    label: 'Diwali gifting',
  },
  {
    id: 'DP3OMVrEhOA',
    url: 'https://www.instagram.com/reel/DP3OMVrEhOA/',
    image: '/assets/instagram-reels/DP3OMVrEhOA.jpg',
    video: null,
    label: 'Gifts made with care',
  },
];

const instagramProfile = 'https://www.instagram.com/nisquarepackaging/';

export default function PreviousWorkSection() {
  return (
    <section className="previous-work-section" aria-labelledby="previous-work-heading">
      <div className="previous-work-heading">
        <div className="previous-work-copy">
          <p className="previous-work-eyebrow">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle className="instagram-icon-dot" cx="17.7" cy="6.6" r=".9" />
            </svg>
            Seen on Instagram Reels
          </p>
          <h2 id="previous-work-heading">As Seen on Reels</h2>
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
      </div>

      <div
        className="previous-work-track"
        role="region"
        aria-label="Previous gifting and packaging projects"
        tabIndex={0}
      >
        {previousWorkReels.map((reel) => (
          <a
            className="previous-work-card"
            key={reel.id}
            href={reel.url}
            target="_blank"
            rel="noreferrer"
            aria-label={'Watch ' + reel.label + ' on Instagram'}
          >
            {reel.video ? (
              <video
                className="previous-work-media"
                src={reel.video}
                poster={reel.image}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            ) : (
              <img className="previous-work-media" src={reel.image} alt={reel.label + ' Reel cover'} loading="lazy" />
            )}
            <span className="previous-work-reel-instagram" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle className="instagram-icon-dot" cx="17.7" cy="6.6" r=".9" />
              </svg>
            </span>
            <span className="previous-work-reel-caption">
              <span className="previous-work-reel-title">{reel.label}</span>
              <span className="previous-work-reel-cta">Watch reel</span>
            </span>
          </a>
        ))}
      </div>
      <div className="previous-work-footer">
        <WhatsAppContactLink className="previous-work-link" message="Hi, I would like to plan a custom gifting project.">Plan a custom project</WhatsAppContactLink>
      </div>
    </section>
  );
}
