import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { heroContent } from '../../data/siteContent';
import WhatsAppContactLink from '../WhatsAppContactLink';

export interface Slide {
  image: string;
  mobileImage: string;
  video?: string;
  videoStartTime?: number;
  subtitle: string;
  title: string;
  ctaText: string;
}

const slides: Slide[] = [
  {
    video: '/assets/videos/hero/trousseau-curation.mp4',
    image: '/assets/images/optimized/hero-trousseau-curation-desktop.webp',
    mobileImage: '/assets/images/optimized/hero-trousseau-curation-mobile.webp',
    subtitle: 'NI Square Packaging',
    title: 'From our hands to your loved ones, with love.',
    ctaText: 'Plan a hamper',
  },
  {
    video: '/assets/videos/hero/personalised-gifting.mp4',
    image: '/assets/images/optimized/hero-festive-occasions-desktop.webp',
    mobileImage: '/assets/images/optimized/hero-festive-occasions-mobile.webp',
    subtitle: 'Thoughtful hampers for every kind of occasion',
    title: 'Make every gift feel personal',
    ctaText: 'Plan a hamper',
  },
  {
    video: '/assets/videos/hero/baby-celebrations.mp4',
    image: '/assets/images/optimized/hero-celebrations-baby-desktop.webp',
    mobileImage: '/assets/images/optimized/hero-celebrations-baby-mobile.webp',
    subtitle: 'Weddings, birthdays, baby celebrations, and more',
    title: 'Hampers for life’s occasions',
    ctaText: 'Plan a hamper',
  },
  {
    video: '/assets/videos/hero/wedding-favours.mp4',
    image: '/assets/images/optimized/hero-return-favours-desktop.webp',
    mobileImage: '/assets/images/optimized/hero-return-favours-mobile.webp',
    subtitle: 'A thoughtful way to thank the people you love',
    title: 'Return favours guests will remember',
    ctaText: 'Plan a hamper',
  },
  {
    video: '/assets/videos/hero/bridesmaid-curation.mp4',
    image: '/assets/images/optimized/hero-custom-curation-desktop.webp',
    mobileImage: '/assets/images/optimized/hero-custom-curation-mobile.webp',
    subtitle: 'Personalised around your theme, taste, and budget',
    title: 'A gift made around your idea',
    ctaText: 'Plan a hamper',
  },
];

function HeroMedia({
  slide,
  index,
  className,
  isActive,
  onVideoEnd,
}: {
  slide: Slide;
  index: number;
  className: string;
  isActive: boolean;
  onVideoEnd?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    const mobileQuery = window.matchMedia('(max-width: 699px)');
    setIsMobile(mobileQuery.matches);
    const mobileListener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileQuery.addEventListener('change', mobileListener);

    return () => {
      motionQuery.removeEventListener('change', motionListener);
      mobileQuery.removeEventListener('change', mobileListener);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !slide.video || prefersReducedMotion) return;

    if (isActive) {
      const startTime = slide.videoStartTime || 0;
      if (startTime > 0 && (video.currentTime < startTime || video.ended)) {
        video.currentTime = startTime;
      }
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handled by browser policy
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, slide.video, slide.videoStartTime, prefersReducedMotion]);

  const poster = isMobile ? slide.mobileImage : slide.image;

  if (slide.video && !prefersReducedMotion) {
    return (
      <div className={'hero-picture ' + className}>
        <video
          ref={videoRef}
          src={slide.video}
          poster={poster}
          className="hero-video"
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
          onLoadedMetadata={() => {
            const video = videoRef.current;
            if (video && slide.videoStartTime && video.currentTime < slide.videoStartTime) {
              video.currentTime = slide.videoStartTime;
            }
          }}
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.pause();
            }
            onVideoEnd?.();
          }}
        />
      </div>
    );
  }

  return (
    <picture className={'hero-picture ' + className}>
      <source media="(max-width: 699px)" srcSet={slide.mobileImage} />
      <img src={slide.image} alt="" className="hero-image" fetchPriority={index === 0 ? 'high' : 'auto'} />
    </picture>
  );
}

export interface HeroProps {
  data?: {
    subtitle?: string;
    title?: string;
    ctaText?: string;
  };
}

export default function Hero({ data = heroContent }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const pointerStart = useRef<number | null>(null);
  const activeSlideRef = useRef(0);
  const changeRequest = useRef(0);
  const imageCache = useRef(new Map<string, Promise<boolean>>());

  const preloadSlide = useCallback((slide: Slide): Promise<boolean> => {
    const isMobile = window.matchMedia('(max-width: 699px)').matches;
    const source = isMobile ? slide.mobileImage : slide.image;
    const cached = imageCache.current.get(source);
    if (cached) return cached;

    const image = new window.Image();
    const request = new Promise<boolean>((resolve) => {
      image.onload = () => resolve(true);
      image.onerror = () => {
        imageCache.current.delete(source);
        resolve(false);
      };
    });
    imageCache.current.set(source, request);
    image.src = source;
    if (image.complete && image.naturalWidth > 0) {
      image.onload = null;
      image.onerror = null;
      imageCache.current.set(source, Promise.resolve(true));
      return imageCache.current.get(source)!;
    }
    return request;
  }, []);

  const goToSlide = useCallback(async (index: number) => {
    const next = (index + slides.length) % slides.length;
    if (next === activeSlideRef.current) return;
    const requestId = ++changeRequest.current;
    const isLoaded = await preloadSlide(slides[next]);
    if (!isLoaded || requestId !== changeRequest.current) return;

    setPreviousSlide(activeSlideRef.current);
    activeSlideRef.current = next;
    setActiveSlide(next);
  }, [preloadSlide]);

  useEffect(() => {
    void preloadSlide(slides[(activeSlide + 1) % slides.length]);
  }, [activeSlide, preloadSlide]);

  useEffect(() => {
    if (previousSlide === null) return undefined;
    const timer = window.setTimeout(() => setPreviousSlide(null), 760);
    return () => window.clearTimeout(timer);
  }, [previousSlide]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const currentSlide = slides[activeSlide];
    const duration = currentSlide.video ? 8200 : 6000;
    const timer = window.setTimeout(() => goToSlide(activeSlideRef.current + 1), duration);
    return () => window.clearTimeout(timer);
  }, [activeSlide, goToSlide]);

  const slide = slides[activeSlide];
  const firstSlide = activeSlide === 0;
  const subtitle = firstSlide ? (data.subtitle || slide.subtitle) : slide.subtitle;
  const title = firstSlide ? (data.title || slide.title) : slide.title;
  const ctaText = firstSlide ? (data.ctaText || slide.ctaText) : slide.ctaText;
  const slideDuration = slide.video ? '8.2s' : '6s';

  return (
    <section className="hero-section" aria-label="NI Square Packaging gifting">
      <div
        className="hero-media-wrapper slideshow"
        style={{ '--slideshow-progress-duration': slideDuration, '--slideshow-progress-play-state': 'running' } as CSSProperties}
        onTouchStart={(event) => { pointerStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.changedTouches[0].clientX - pointerStart.current;
          if (Math.abs(distance) > 50) goToSlide(activeSlideRef.current + (distance < 0 ? 1 : -1));
          pointerStart.current = null;
        }}
      >
        {previousSlide !== null && (
          <HeroMedia
            slide={slides[previousSlide]}
            index={previousSlide}
            className="hero-picture--outgoing"
            isActive={false}
            key={'outgoing-' + previousSlide}
          />
        )}
        <HeroMedia
          slide={slide}
          index={activeSlide}
          className={previousSlide === null ? 'hero-picture--current' : 'hero-picture--incoming'}
          isActive={true}
          onVideoEnd={() => {
            // Optional transition when video finishes
          }}
          key={'incoming-' + activeSlide}
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content" aria-live="polite">
          <div className="hero-prose">
            {subtitle && <p className="hero-subtitle">{subtitle}</p>}
            {title && (
              <h1 className="hero-title" aria-label={title}>
                {title.trim().split(/\s+/).map((word, index, words) => (
                  <Fragment key={index}>
                    <span className="hero-title-word" aria-hidden="true" style={{ '--word-delay': `${0.22 + index * 0.055}s` } as CSSProperties}>{word}</span>
                    {index < words.length - 1 ? ' ' : null}
                  </Fragment>
                ))}
              </h1>
            )}
            <WhatsAppContactLink message="Hi, I would like to plan a hamper." className="button hero-button">{ctaText}</WhatsAppContactLink>
          </div>
        </div>
        <button type="button" className="hero-scroll-down circle-button circle-button--lg" aria-label="Scroll to collections" onClick={() => document.querySelector('.home-categories')?.scrollIntoView({ behavior: 'smooth' })}>
          <svg aria-hidden="true" focusable="false" fill="none" viewBox="0 0 18 16"><path d="m1 4 8 8 8-8" stroke="currentColor" strokeLinecap="square" /></svg>
        </button>
        <div className="hero-carousel-dots page-dots page-dots--autoplay" aria-label="Choose a featured slide">
          {slides.map((item, index) => (
            <button type="button" className="tap-area hero-dot" aria-label={'Show slide ' + (index + 1)} aria-current={index === activeSlide ? 'true' : 'false'} onClick={() => goToSlide(index)} key={item.image}>
              <span className="sr-only">Go to item {index + 1}</span>
              <svg className="circular-progress" height="8" width="8" viewBox="0 0 8 8" style={{ '--stroke-dasharray': '20.420352248335' } as CSSProperties}>
                <circle cx="50%" cy="50%" fill="none" strokeWidth="1.5" r="3.25" stroke="currentColor" strokeOpacity=".2" />
                <circle cx="50%" cy="50%" fill="none" strokeWidth="1.5" r="3.25" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
