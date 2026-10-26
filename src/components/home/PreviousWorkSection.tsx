import { useRef, useState } from 'react';
import WhatsAppContactLink from '../WhatsAppContactLink';
import { SolidInstagramIcon } from '../common/Icons';

interface PreviousWorkReel {
  id: string;
  url: string;
  image: string;
  video: string | null;
  label: string;
}

const previousWorkReels: PreviousWorkReel[] = [
  {
    id: 'C2phJ92pJEZ',
    url: 'https://www.instagram.com/reel/C2phJ92pJEZ/',
    image: '/assets/instagram-reels/C2phJ92pJEZ.webp',
    video: '/assets/instagram-reels/C2phJ92pJEZ.mp4',
    label: 'Wedding trousseau hampers',
  },
  {
    id: 'C34YbeoI0oq',
    url: 'https://www.instagram.com/reel/C34YbeoI0oq/',
    image: '/assets/instagram-reels/C34YbeoI0oq.webp',
    video: '/assets/instagram-reels/C34YbeoI0oq.mp4',
    label: 'Customised wedding invites',
  },
  {
    id: 'C43PVooJ0aM',
    url: 'https://www.instagram.com/reel/C43PVooJ0aM/',
    image: '/assets/instagram-reels/C43PVooJ0aM.webp',
    video: '/assets/instagram-reels/C43PVooJ0aM.mp4',
    label: 'Wedding invite hampers',
  },
  {
    id: 'DXwzDzWzUwD',
    url: 'https://www.instagram.com/reel/DXwzDzWzUwD/',
    image: '/assets/instagram-reels/DXwzDzWzUwD.webp',
    video: '/assets/instagram-reels/DXwzDzWzUwD.mp4',
    label: 'Personalised gifting',
  },
  {
    id: 'DQgmQuZkni8',
    url: 'https://www.instagram.com/reel/DQgmQuZkni8/',
    image: '/assets/instagram-reels/DQgmQuZkni8.webp',
    video: '/assets/instagram-reels/DQgmQuZkni8.mp4',
    label: 'Bridesmaid hampers',
  },
];

const instagramProfile = 'https://www.instagram.com/nisquarepackaging/';

function ReelCard({ reel }: { reel: PreviousWorkReel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err: unknown) => {
          if (err instanceof Error && err.name === 'AbortError') return;
        });
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <a
      className={`previous-work-card ${isPlaying ? 'is-playing' : ''}`}
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={'Watch ' + reel.label + ' on Instagram'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {reel.video ? (
        <video
          ref={videoRef}
          className="previous-work-media"
          src={reel.video}
          poster={reel.image}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : (
        <img
          className="previous-work-media"
          src={reel.image}
          alt={reel.label + ' Reel cover'}
          loading="lazy"
          decoding="async"
        />
      )}
      <span className="previous-work-reel-instagram" aria-hidden="true">
        <SolidInstagramIcon />
      </span>
      <span className="previous-work-reel-caption">
        <span className="previous-work-reel-title">{reel.label}</span>
        <span className="previous-work-reel-cta" aria-hidden="true">
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#B99A66] animate-pulse">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
              <circle cx="12" cy="12" r="2.7" />
            </svg>
          )}
        </span>
      </span>
    </a>
  );
}

export default function PreviousWorkSection() {
  return (
    <section className="previous-work-section" aria-labelledby="previous-work-heading">
      <div className="ni-decoration-layer" aria-hidden="true">
        <img
          src="/assets/decorations/botanical-branch-curved.webp"
          alt=""
          className="ni-motif previous-work-motif-foliage"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="previous-work-heading">
        <div className="previous-work-copy">
          <p className="previous-work-eyebrow">
            <SolidInstagramIcon />
            Seen on Instagram Reels
          </p>
          <h2 id="previous-work-heading">As Seen on Reels</h2>
          <p className="previous-work-description">
            A closer look at the hampers, thoughtful details, and celebrations we bring together by hand.
          </p>
          <a className="previous-work-instagram" href={instagramProfile} target="_blank" rel="noopener noreferrer">
            <SolidInstagramIcon />
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
        {previousWorkReels.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
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
