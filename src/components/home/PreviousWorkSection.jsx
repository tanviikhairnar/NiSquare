import React from 'react';
import WhatsAppContactLink from '../WhatsAppContactLink';

const previousWorkReels = [
  {
    id: 'C2phJ92pJEZ',
    url: 'https://www.instagram.com/reel/C2phJ92pJEZ/',
    image: '/assets/instagram-reels/C2phJ92pJEZ.jpg',
    video: null,
    label: 'Wedding trousseau hampers',
  },
  {
    id: 'C34YbeoI0oq',
    url: 'https://www.instagram.com/reel/C34YbeoI0oq/',
    image: '/assets/instagram-reels/C34YbeoI0oq.jpg',
    video: null,
    label: 'Customised wedding invites',
  },
  {
    id: 'C43PVooJ0aM',
    url: 'https://www.instagram.com/reel/C43PVooJ0aM/',
    image: '/assets/instagram-reels/C43PVooJ0aM.jpg',
    video: null,
    label: 'Wedding invite hampers',
  },
  {
    id: 'DXwzDzWzUwD',
    url: 'https://www.instagram.com/reel/DXwzDzWzUwD/',
    image: '/assets/instagram-reels/DXwzDzWzUwD.jpg',
    video: null,
    label: 'Personalised gifting',
  },
  {
    id: 'DQgmQuZkni8',
    url: 'https://www.instagram.com/reel/DQgmQuZkni8/',
    image: '/assets/instagram-reels/DQgmQuZkni8.jpg',
    video: null,
    label: 'Bridesmaid hampers',
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
            <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </div>

      <div
        className="previous-work-track"
        role="region"
        aria-label="Previous gifting and packaging projects"
        tabIndex={0}
      >
        {previousWorkReels.map((reel, index) => (
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
              <img className="previous-work-media" src={reel.image} alt={reel.label + ' Reel cover'} loading={index < 2 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
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
              <span className="previous-work-reel-cta" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
                  <circle cx="12" cy="12" r="2.7" />
                </svg>
              </span>
            </span>
          </a>
        ))}
      </div>
      <div className="previous-work-footer">
        <WhatsAppContactLink className="previous-work-link" message="Hi, I would like to plan a custom gifting project.">
          Plan a custom project
        </WhatsAppContactLink>
      </div>
    </section>
  );
}
