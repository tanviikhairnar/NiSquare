import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { storeCollections } from '../../data/storeCatalog';

export default function CategoryGrid() {
  const track = useRef(null);
  const animationFrame = useRef(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  const pauseRotation = (element = track.current) => {
    setPaused(true);
    if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
    animationFrame.current = null;
    if (element) element.style.scrollBehavior = 'auto';
  };
  const resumeRotation = (element = track.current) => {
    setPaused(false);
    element?.style.removeProperty('scroll-behavior');
  };

  useEffect(() => {
    const element = track.current;
    if (!element || !inView || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let previousTime = 0;
    const move = (time) => {
      if (previousTime) {
        const firstCard = element.firstElementChild;
        const gap = Number.parseFloat(window.getComputedStyle(element).columnGap) || 0;
        const loopDistance = (firstCard.getBoundingClientRect().width + gap) * storeCollections.length;
        element.scrollLeft += (time - previousTime) * 0.036;
        if (loopDistance > 0 && element.scrollLeft >= loopDistance) element.scrollLeft -= loopDistance;
      }
      previousTime = time;
      animationFrame.current = window.requestAnimationFrame(move);
    };

    animationFrame.current = window.requestAnimationFrame(move);
    return () => {
      if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    };
  }, [inView, paused]);

  useEffect(() => {
    const element = track.current;
    if (!element || !('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const cards = [...storeCollections, ...storeCollections];

  return (
    <section className="home-categories" aria-label="Gifting categories" aria-roledescription="carousel">
      <div
        className="home-category-grid"
        ref={track}
        onMouseEnter={(event) => pauseRotation(event.currentTarget)}
        onMouseLeave={(event) => resumeRotation(event.currentTarget)}
        onFocusCapture={(event) => pauseRotation(event.currentTarget)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) resumeRotation(event.currentTarget); }}
        onTouchStart={(event) => pauseRotation(event.currentTarget)}
        onTouchEnd={(event) => resumeRotation(event.currentTarget)}
      >
        {cards.map((collection, index) => {
          const duplicate = index >= storeCollections.length;
          return (
            <Link
              className="home-category-card collection-card group"
              to={`/collections/${collection.slug}`}
              key={`${collection.slug}-${index}`}
              aria-hidden={duplicate || undefined}
              tabIndex={duplicate ? -1 : undefined}
            >
              <div className="home-category-media content-over-media content-over-media--auto">
                <img className="zoom-image group-hover:zoom" src={collection.image} alt={duplicate ? '' : collection.title} loading="lazy" />
                <div className="home-category-content collection-card__content prose prose--tight place-self-center text-center">
                  <span className="home-category-title">{collection.title}</span>
                  <span className="home-category-cta">Explore category</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
