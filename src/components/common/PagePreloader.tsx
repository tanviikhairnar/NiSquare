import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PagePreloader provides an opening brand moment and seamless route transitions
 * using the authentic NI Square diamond emblem.
 */
export default function PagePreloader() {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const location = useLocation();
  const previousPathRef = useRef<string>(location.pathname);

  // Initial site load reveal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  // Subtle luxury route transition indicator (only on actual route navigation)
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

      {/* Initial luxury splash preloader */}
      <div
        className={`brand-preloader-screen ${isInitialLoading ? 'is-visible' : 'is-hidden'}`}
        aria-hidden={!isInitialLoading}
      >
        <div className="brand-preloader-content">
          <div className="brand-loader-emblem-box brand-loader-emblem-box--lg">
            <span className="brand-loader-ring" aria-hidden="true" />
            <img
              src="/assets/logo/ni-square-emblem-gold.webp"
              alt="NI Square Packaging"
              className="brand-loader-emblem"
              loading="eager"
            />
          </div>
          <span className="brand-preloader-title">NI SQUARE</span>
          <span className="brand-preloader-tagline">PACKAGING</span>
        </div>
      </div>
    </>
  );
}

