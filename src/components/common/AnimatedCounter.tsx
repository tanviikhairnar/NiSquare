import React, { useEffect, useRef, useState } from 'react';

export interface AnimatedCounterProps {
  end: number;
  duration?: number; // duration in milliseconds (default: 2000)
  suffix?: string;
  separator?: boolean;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '+',
  separator = true,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // If user prefers reduced motion, show full target immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    let rafId: number | null = null;

    const startAnimation = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth easeOutCubic deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * end);

        setCount(current);

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };

      rafId = requestAnimationFrame(step);
    };

    // Check if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startAnimation();
      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          observer.disconnect();
          startAnimation();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [end, duration]);

  const formatted = separator ? count.toLocaleString('en-US') : count.toString();

  return (
    <span
      ref={elementRef}
      className={`animated-counter-value inline-block tabular-nums ${className}`.trim()}
      style={{
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        color: 'inherit',
        letterSpacing: 'inherit',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {formatted}
      {suffix}
    </span>
  );
}

