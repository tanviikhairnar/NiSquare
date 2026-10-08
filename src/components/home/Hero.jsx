import React, { useCallback, useEffect, useRef, useState } from 'react';
import { heroContent } from '../../data/siteContent';

const slides = [
  { image: 'https://www.studio13.co.in/cdn/shop/files/home-page-banner-01.jpg?v=1725276693&width=3200', mobileImage: 'https://www.studio13.co.in/cdn/shop/files/banner_4_mob.jpg?v=1741689853&width=1200', subtitle: 'NI Square Packaging', title: 'From our hands to your loved ones, with love.', ctaText: 'Plan a hamper', ctaLink: '/pages/contact' },
  { image: 'https://www.studio13.co.in/cdn/shop/files/home-page-banner-02.jpg?v=1725277403&width=3200', mobileImage: 'https://www.studio13.co.in/cdn/shop/files/banner_3_mob.jpg?v=1741689853&width=1200', subtitle: 'Thoughtful hampers for every kind of occasion', title: 'Make every gift feel personal', ctaText: 'Plan a hamper', ctaLink: '/pages/contact' },
  { image: 'https://www.studio13.co.in/cdn/shop/files/home-page-banner-03.jpg?v=1725276037&width=3200', mobileImage: 'https://www.studio13.co.in/cdn/shop/files/banner_2_mob.jpg?v=1741689852&width=1200', subtitle: 'Weddings, birthdays, baby celebrations, and more', title: 'Hampers for life’s occasions', ctaText: 'Plan a hamper', ctaLink: '/pages/contact' },
  { image: 'https://www.studio13.co.in/cdn/shop/files/home-page-banner-04.jpg?v=1725278735&width=3200', mobileImage: 'https://www.studio13.co.in/cdn/shop/files/banner_1.1_mob.jpg?v=1741689853&width=1200', subtitle: 'A thoughtful way to thank the people you love', title: 'Return favours guests will remember', ctaText: 'Plan a hamper', ctaLink: '/pages/contact' },
  { image: 'https://www.studio13.co.in/cdn/shop/files/home-page-banner-05.jpg?v=1725278950&width=3200', mobileImage: 'https://www.studio13.co.in/cdn/shop/files/banner_5_mob.jpg?v=1741689853&width=1200', subtitle: 'Personalised around your theme, taste, and budget', title: 'A gift made around your idea', ctaText: 'Plan a hamper', ctaLink: '/pages/contact' },
];

function HeroPicture({ slide, index, className }) {
  return (
    <picture className={'hero-picture ' + className}>
      <source media="(max-width: 699px)" srcSet={slide.mobileImage} />
      <img src={slide.image} alt="" className="hero-image" fetchPriority={index === 0 ? 'high' : 'auto'} />
    </picture>
  );
}

export default function Hero({ data = heroContent }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(null);
  const pointerStart = useRef(null);
  const activeSlideRef = useRef(0);
  const changeRequest = useRef(0);
  const imageCache = useRef(new Map());

  const preloadSlide = useCallback((slide) => {
    const isMobile = window.matchMedia('(max-width: 699px)').matches;
    const source = isMobile ? slide.mobileImage : slide.image;
    const cached = imageCache.current.get(source);
    if (cached) return cached;

    const image = new window.Image();
    const request = new Promise((resolve) => {
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
      return imageCache.current.get(source);
    }
    return request;
  }, []);

  const goToSlide = useCallback(async (index) => {
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
    const timer = window.setTimeout(() => goToSlide(activeSlideRef.current + 1), 6000);
    return () => window.clearTimeout(timer);
  }, [activeSlide, goToSlide]);

  const slide = slides[activeSlide];
  const firstSlide = activeSlide === 0;
  const subtitle = firstSlide ? (data.subtitle || slide.subtitle) : slide.subtitle;
  const title = firstSlide ? (data.title || slide.title) : slide.title;
  const ctaText = firstSlide ? (data.ctaText || slide.ctaText) : slide.ctaText;
  const ctaLink = firstSlide ? (data.ctaLink || slide.ctaLink) : slide.ctaLink;

  return (
    <section className="hero-section" aria-label="NI Square Packaging gifting">
      <div
        className="hero-media-wrapper slideshow"
        style={{ '--slideshow-progress-duration': '6s', '--slideshow-progress-play-state': 'running' }}
        onTouchStart={(event) => { pointerStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.changedTouches[0].clientX - pointerStart.current;
          if (Math.abs(distance) > 50) goToSlide(activeSlideRef.current + (distance < 0 ? 1 : -1));
          pointerStart.current = null;
        }}
      >
        {previousSlide !== null && <HeroPicture slide={slides[previousSlide]} index={previousSlide} className="hero-picture--outgoing" key={'outgoing-' + previousSlide} />}
        <HeroPicture slide={slide} index={activeSlide} className={previousSlide === null ? 'hero-picture--current' : 'hero-picture--incoming'} key={'incoming-' + activeSlide} />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content" key={'content-' + activeSlide} aria-live="polite">
          <div className="hero-prose">
            {subtitle && <p className="hero-subtitle">{subtitle}</p>}
            {title && <h1 className="hero-title">{title}</h1>}
            <a href={ctaLink} className="button hero-button" style={{ '--button-background': '74 23 35', '--button-outline-color': '74 23 35', '--button-text-color': '246 238 229' }}>{ctaText}</a>
          </div>
        </div>
        <button type="button" className="hero-scroll-down circle-button circle-button--lg" aria-label="Scroll to collections" onClick={() => document.querySelector('.home-categories')?.scrollIntoView({ behavior: 'smooth' })}>
          <svg aria-hidden="true" focusable="false" fill="none" viewBox="0 0 18 16"><path d="m1 4 8 8 8-8" stroke="currentColor" strokeLinecap="square" /></svg>
        </button>
        <div className="hero-carousel-dots page-dots page-dots--autoplay" aria-label="Choose a featured slide">
          {slides.map((item, index) => (
            <button type="button" className="tap-area hero-dot" aria-label={'Show slide ' + (index + 1)} aria-current={index === activeSlide ? 'true' : 'false'} onClick={() => goToSlide(index)} key={item.image}>
              <span className="sr-only">Go to item {index + 1}</span>
              <svg className="circular-progress" height="8" width="8" viewBox="0 0 8 8" style={{ '--stroke-dasharray': '20.420352248335' }}>
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
