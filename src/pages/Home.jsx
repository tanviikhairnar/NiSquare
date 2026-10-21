import React, { useLayoutEffect } from 'react';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import { ServicesSection } from '../components/home/NIStorySections';
import {
  HomeAboutSection,
  HomeTrustStrip,
  HowWeWorkSection,
  HomePortfolioSection,
  WhyChooseUsSection,
} from '../components/home/HomeEditorialSections';
import PreviousWorkSection from '../components/home/PreviousWorkSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

export default function Home() {
  useLayoutEffect(() => {
    const sections = document.querySelectorAll(
      '.home-about, .ni-services, .home-process, .home-why-choose, .home-categories, .home-portfolio, .previous-work-section, .ni-testimonials',
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
    }, { threshold: 0.05, rootMargin: '0px 0px 12% 0px' });

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
      <HomeTrustStrip />
      <HomeAboutSection />
      <ServicesSection />
      <HowWeWorkSection />
      <WhyChooseUsSection />
      <HomePortfolioSection />
      <PreviousWorkSection />
      <TestimonialsSection />
    </>
  );
}

