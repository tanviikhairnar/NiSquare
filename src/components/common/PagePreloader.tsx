import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';

interface LogoCoords {
  x: number;
  y: number;
  width: number;
  height: number;
}

function getInitialLogoCoords(): LogoCoords | null {
  if (typeof window === 'undefined') return null;
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  const initialWidth = Math.min(winWidth * 0.68, 290);
  const initialHeight = initialWidth / (1691 / 556);
  return {
    x: (winWidth - initialWidth) / 2,
    y: (winHeight - initialHeight) / 2,
    width: initialWidth,
    height: initialHeight,
  };
}

/**
 * PagePreloader provides an opening brand moment:
 * The signature NI Square logo is introduced centrally, then gracefully glides and scales
 * directly into its exact position in the site header, taking its place before the page reveals.
 */
export default function PagePreloader() {
  const [stage, setStage] = useState<'initial' | 'flying' | 'done'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return 'done';
    }
    return 'initial';
  });
  const [initialCoords] = useState<LogoCoords | null>(getInitialLogoCoords);
  const [transformStyle, setTransformStyle] = useState<string>('none');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const location = useLocation();
  const previousPathRef = useRef<string>(location.pathname);

  // Initial site launch animation
  useEffect(() => {
    if (stage === 'done' || !initialCoords) {
      return undefined;
    }

    // Mark body as animating so the real static header logo is hidden until docked
    document.body.classList.add('is-intro-animating');

    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    // Hold centrally for a moment so the user sees the luxury brand logo
    const holdTimer = setTimeout(() => {
      const headerLogo = document.querySelector('.header-logo-image') as HTMLElement | null;

      if (!headerLogo) {
        document.body.classList.remove('is-intro-animating');
        setStage('done');
        return;
      }

      const destRect = headerLogo.getBoundingClientRect();
      const deltaX = destRect.left - initialCoords.x;
      const deltaY = destRect.top - initialCoords.y;
      const scaleX = destRect.width / initialCoords.width;
      const scaleY = destRect.height / initialCoords.height;

      setStage('flying');
      setTransformStyle(`translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`);

      // Once the flight animation completes, dock the logo and reveal the page
      finishTimer = setTimeout(() => {
        document.body.classList.remove('is-intro-animating');
        setStage('done');
      }, 1300);
    }, 1400);

    return () => {
      clearTimeout(holdTimer);
      if (finishTimer) clearTimeout(finishTimer);
      document.body.classList.remove('is-intro-animating');
    };
  }, [initialCoords, stage]);

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
