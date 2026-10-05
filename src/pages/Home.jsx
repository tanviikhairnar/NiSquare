import React from 'react';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import NewArrivals from '../components/home/NewArrivals';
import { FoundersSection } from '../components/home/NIStorySections';
import CompanyBanner from '../components/home/CompanyBanner';
import PreviousWorkSection from '../components/home/PreviousWorkSection';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <NewArrivals />
      <FoundersSection />
      <CompanyBanner />
      <PreviousWorkSection />
      <Newsletter />
    </>
  );
}