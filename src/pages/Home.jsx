import React, { useLayoutEffect } from 'react';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import { FoundersSection } from '../components/home/NIStorySections';
import CompanyBanner from '../components/home/CompanyBanner';
import PreviousWorkSection from '../components/home/PreviousWorkSection';

export default function Home() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const sections = document.querySelectorAll(
      '.home-categories, .ni-founders, .ni-company-banner, .previous-work-section',
    );

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('home-motion-ready', 'home-motion-seen'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('home-motion-seen');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });

    sections.forEach((section) => {
      section.classList.add('home-motion-ready');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <FoundersSection showBiographies={false} />
      <CompanyBanner />
      <PreviousWorkSection />
    </>
  );
}
