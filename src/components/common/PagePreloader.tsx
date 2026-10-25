import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';

interface LogoCoords {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * PagePreloader provides an opening brand moment:
 * The signature NI Square logo is introduced centrally, then gracefully glides and scales
 * directly into its exact position in the site header, taking its place before the page reveals.
 */
export default function PagePreloader() {
  const [stage, setStage] = useState<'initial' | 'flying' | 'done'>('initial');
  const [initialCoords, setInitialCoords] = useState<LogoCoords | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>('none');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const location = useLocation();
  const previousPathRef = useRef<string>(location.pathname);

  // Initial site launch animation
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStage('done');
      return undefined;
    }

    // Mark body as animating so the real static header logo is hidden until docked
    document.body.classList.add('is-intro-animating');

    // Calculate initial centered position
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const initialWidth = Math.min(winWidth * 0.68, 290);
    const initialHeight = initialWidth / (1691 / 556);
    const startX = (winWidth - initialWidth) / 2;
    const startY = (winHeight - initialHeight) / 2;

    setInitialCoords({
      x: startX,
      y: startY,
      width: initialWidth,
      height: initialHeight,
    });

    // Hold centrally for a moment so the user sees the luxury brand logo
    const holdTimer = setTimeout(() => {
      const headerLogo = document.querySelector('.header-logo-image') as HTMLElement | null;

      if (!headerLogo) {
        document.body.classList.remove('is-intro-animating');
        setStage('done');
        return;
      }

      const destRect = headerLogo.getBoundingClientRect();
      const deltaX = destRect.left - startX;
      const deltaY = destRect.top - startY;
      const scaleX = destRect.width / initialWidth;
      const scaleY = destRect.height / initialHeight;

      setStage('flying');
      setTransformStyle(`translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`);

      // Once the flight animation completes, dock the logo and reveal the page
      const finishTimer = setTimeout(() => {
        document.body.classList.remove('is-intro-animating');
        setStage('done');
      }, 1300);

      return () => clearTimeout(finishTimer);
    }, 1400);

    return () => {
      clearTimeout(holdTimer);
      document.body.classList.remove('is-intro-animating');
    };
  }, []);

  // Subtle route transition indicator on internal navigation
  useEffect(() => {
    if (previousPathRef.current === location.pathname) return undefined;
    previousPathRef.current = location.pathname;

    const frame = window.requestAnimationFrame(() => {
      setIsNavigating(true);
    });
    const navTimer = setTimeout(() => {
      setIsNavigating(false);
    }, 380);

    return () => {
      window.cancelAnimationFrame(frame);
      clearTimeout(navTimer);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Top route progress bar */}
      <div
        className={`route-progress-bar ${isNavigating ? 'is-active' : ''}`}
        aria-hidden="true"
      />

      {/* Opening Hero Intro: Logo glides from center to header */}
      {stage !== 'done' && initialCoords && (
        <>
          {/* Fading burgundy backdrop */}
          <div
            className={`brand-preloader-backdrop ${stage === 'flying' ? 'is-fading' : ''}`}
            aria-hidden="true"
          />

          {/* Subtitle / Tagline that fades out as the logo takes flight */}
          <span
            className={`brand-intro-tagline ${stage === 'flying' ? 'is-fading' : ''}`}
            style={{
              top: `${initialCoords.y + initialCoords.height + 22}px`,
            }}
            aria-hidden="true"
          >
            HANDCRAFTED LUXURY PACKAGING
          </span>

          {/* Moving brand logo */}
          <img
            src="/assets/logo/ni-square-logo-cream.webp"
            alt="NI Square Packaging"
            className={`brand-intro-moving-logo ${stage === 'flying' ? 'is-flying' : ''}`}
            style={{
              left: `${initialCoords.x}px`,
              top: `${initialCoords.y}px`,
              width: `${initialCoords.width}px`,
              height: `${initialCoords.height}px`,
              transform: transformStyle,
              transition:
                stage === 'flying'
                  ? 'transform 1.3s cubic-bezier(0.22, 1, 0.36, 1), filter 1.3s ease'
                  : 'none',
            } as CSSProperties}
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
}
