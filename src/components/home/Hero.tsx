import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { heroContent } from '../../data/siteContent';
import WhatsAppContactLink from '../WhatsAppContactLink';

const HERO_TRANSITION_MS = 950;

export interface Slide {
  image: string;
  mobileImage: string;
  video?: string;
  videoStartTime?: number;
  durationMs: number;
  subtitle: string;
  title: string;
  ctaText: string;
}

const slides: Slide[] = [
  {
    image: '/assets/images/optimized/hero-trousseau-curation-desktop.webp',
    mobileImage: '/assets/images/optimized/hero-trousseau-curation-mobile.webp',
    video: '/assets/videos/hero/trousseau-curation.mp4',
    durationMs: 9000,
    subtitle: 'NI Square Packaging',
    title: 'From our hands to your loved ones, with love.',
    ctaText: 'Plan a hamper',
  },
  {
    image: '/assets/images/optimized/hero-festive-occasions-desktop.webp',
    mobileImage: '/assets/images/optimized/hero-festive-occasions-mobile.webp',
    video: '/assets/videos/hero/personalised-gifting.mp4',
    durationMs: 8500,
    subtitle: 'Thoughtful hampers for every kind of occasion',
    title: 'Make every gift feel personal',
    ctaText: 'Plan a hamper',
  },
  {
    image: '/assets/images/optimized/hero-celebrations-baby-desktop.webp',
    mobileImage: '/assets/images/optimized/hero-celebrations-baby-mobile.webp',
    video: '/assets/videos/hero/baby-celebrations.mp4',
    durationMs: 9000,
    subtitle: 'Weddings, birthdays, baby celebrations, and more',
    title: 'Hampers for life’s occasions',
    ctaText: 'Plan a hamper',
  },
  {
    image: '/assets/images/optimized/hero-return-favours-desktop.webp',
    mobileImage: '/assets/images/optimized/hero-return-favours-mobile.webp',
    video: '/assets/videos/hero/wedding-favours.mp4',
    durationMs: 9000,
    subtitle: 'A thoughtful way to thank the people you love',
    title: 'Return favours guests will remember',
    ctaText: 'Plan a hamper',
  },
  {
    image: '/assets/images/optimized/hero-custom-curation-desktop.webp',
    mobileImage: '/assets/images/optimized/hero-custom-curation-mobile.webp',
    video: '/assets/videos/hero/bridesmaid-curation.mp4',
    durationMs: 8500,
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
  shouldPlay,
}: {
  slide: Slide;
  index: number;
  className: string;
  isActive: boolean;
  shouldPlay: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 699px)').matches : false,
  );

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    const mobileQuery = window.matchMedia('(max-width: 699px)');
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

    if (isActive && shouldPlay) {
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
  }, [isActive, shouldPlay, slide.video, slide.videoStartTime, prefersReducedMotion]);

  const poster = isMobile ? slide.mobileImage : slide.image;

  if (slide.video && !prefersReducedMotion && !videoFailed) {
    return (
      <div className={'hero-picture ' + className}>
        <video
          ref={videoRef}
          src={slide.video}
          poster={poster}
          className="hero-video"
          aria-hidden="true"
          muted
          playsInline
          loop
          preload="metadata"
          onError={() => setVideoFailed(true)}
          onLoadedMetadata={() => {
            const video = videoRef.current;
            if (video && slide.videoStartTime && video.currentTime < slide.videoStartTime) {
              video.currentTime = slide.videoStartTime;
            }
          }}
        />
      </div>
    );
  }

  return (
    <picture className={'hero-picture ' + className}>
      <source media="(max-width: 699px)" srcSet={slide.mobileImage} />
      <img src={slide.image} alt="" aria-hidden="true" className="hero-image" fetchPriority={index === 0 ? 'high' : 'auto'} />
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
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(() =>
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true,
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  );
  const [announcement, setAnnouncement] = useState('');
  const pointerStart = useRef<number | null>(null);
  const activeSlideRef = useRef(0);
  const changeRequest = useRef(0);
  const imageCache = useRef(new Map<string, Promise<boolean>>());
  const shouldAutoAdvance = !isFocusPaused && isPageVisible && !prefersReducedMotion;

  useEffect(() => {
    const handleVisibilityChange = () => setIsPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    if (!shouldAutoAdvance) changeRequest.current += 1;
  }, [shouldAutoAdvance]);

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

  const goToSlide = useCallback(async (index: number, announceChange = false) => {
    const requestedSlide = (index + slides.length) % slides.length;
    if (requestedSlide === activeSlideRef.current) return;
    const requestId = ++changeRequest.current;
    let next = requestedSlide;
    let isLoaded = false;
    for (let attempt = 0; attempt < slides.length; attempt += 1) {
      if (next === activeSlideRef.current) {
        next = (next + 1) % slides.length;
        continue;
      }
      isLoaded = await preloadSlide(slides[next]);
      if (requestId !== changeRequest.current) return;
      if (isLoaded) break;
      next = (next + 1) % slides.length;
    }
    // If every preload fails, still change slides so the autoplay timer can recover.
    if (!isLoaded) next = requestedSlide;

    setPreviousSlide(activeSlideRef.current);
    activeSlideRef.current = next;
    setActiveSlide(next);
    if (announceChange) {
      const nextTitle = next === 0 ? data.title || slides[next].title : slides[next].title;
      setAnnouncement('Slide ' + (next + 1) + ' of ' + slides.length + ': ' + nextTitle);
    }
  }, [data.title, preloadSlide]);

  useEffect(() => {
    void preloadSlide(slides[(activeSlide + 1) % slides.length]);
  }, [activeSlide, preloadSlide]);

  useEffect(() => {
    if (previousSlide === null) return undefined;
    const timer = window.setTimeout(() => setPreviousSlide(null), HERO_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [previousSlide]);

  useEffect(() => {
    if (!shouldAutoAdvance) return undefined;
    const duration = slides[activeSlide].durationMs;
    const timer = window.setTimeout(() => goToSlide(activeSlideRef.current + 1), duration);
    return () => window.clearTimeout(timer);
  }, [activeSlide, goToSlide, shouldAutoAdvance]);

  const slide = slides[activeSlide];
  const firstSlide = activeSlide === 0;
  const subtitle = firstSlide ? (data.subtitle || slide.subtitle) : slide.subtitle;
  const title = firstSlide ? (data.title || slide.title) : slide.title;
  const ctaText = firstSlide ? (data.ctaText || slide.ctaText) : slide.ctaText;
  const slideDuration = `${slide.durationMs}ms`;

  return (
    <section className="hero-section" id="hero" aria-label="NI Square Packaging gifting">
      <div
        className={'hero-media-wrapper slideshow' + (shouldAutoAdvance ? '' : ' is-paused')}
        style={{ '--slideshow-progress-duration': slideDuration, '--slideshow-progress-play-state': shouldAutoAdvance ? 'running' : 'paused' } as CSSProperties}
        onFocusCapture={(event) => {
          const target = event.target;
          setIsFocusPaused(target instanceof HTMLElement && target.matches(':focus-visible'));
        }}
        onBlurCapture={(event) => {
          const nextTarget = event.relatedTarget;
          if (!(nextTarget instanceof Element) || !event.currentTarget.contains(nextTarget)) {
            setIsFocusPaused(false);
          }
        }}
        onTouchStart={(event) => { pointerStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.changedTouches[0].clientX - pointerStart.current;
          if (Math.abs(distance) > 50) void goToSlide(activeSlideRef.current + (distance < 0 ? 1 : -1), true);
          pointerStart.current = null;
        }}
      >
        {previousSlide !== null && (
          <HeroMedia
            slide={slides[previousSlide]}
            index={previousSlide}
            className="hero-picture--outgoing"
            isActive={false}
            shouldPlay={false}
            key={'outgoing-' + previousSlide}
          />
        )}
        <HeroMedia
          slide={slide}
          index={activeSlide}
          className={previousSlide === null ? 'hero-picture--current' : 'hero-picture--incoming'}
          isActive={true}
          shouldPlay={shouldAutoAdvance}
          key={'incoming-' + activeSlide}
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-prose" key={'copy-' + activeSlide}>
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
            <button type="button" className="tap-area hero-dot" aria-label={'Show slide ' + (index + 1) + ': ' + item.title} aria-current={index === activeSlide ? 'true' : 'false'} onClick={() => void goToSlide(index, true)} key={item.image}>
              <span className="sr-only">Go to item {index + 1}</span>
              <svg key={'progress-' + activeSlide + '-' + shouldAutoAdvance} className="circular-progress" height="8" width="8" viewBox="0 0 8 8" style={{ '--stroke-dasharray': '20.420352248335' } as CSSProperties}>
                <circle cx="50%" cy="50%" fill="none" strokeWidth="1.5" r="3.25" stroke="currentColor" strokeOpacity=".2" />
                <circle cx="50%" cy="50%" fill="none" strokeWidth="1.5" r="3.25" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </div>
        <span className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</span>
      </div>
    </section>
  );
}
