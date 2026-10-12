import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import {
  CollectionPage, CollectionsPage, ContactPage,
  NotFoundPage, PolicyPage, ProductPage, SearchPage, ServicesPage, StoryPage,
} from './pages/StorePages';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function Storefront() {
  return (
    <div className="app-root features--button-transition features--zoom-image">
      <ScrollToTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:handle" element={<CollectionPage />} />
          <Route path="/products/:handle" element={<ProductPage />} />
          <Route path="/pages/our-story" element={<StoryPage />} />
          <Route path="/about" element={<StoryPage />} />
          <Route path="/pages/services" element={<ServicesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pages/work" element={<ServicesPage />} />
          <Route path="/work" element={<CollectionsPage />} />
          <Route path="/pages/corporate-gifting" element={<ServicesPage kind="corporate" />} />
          <Route path="/pages/birth-announcement-gifts" element={<ServicesPage kind="birth" />} />
          <Route path="/pages/contact" element={<ContactPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<ContactPage />} />
          <Route path="/checkout" element={<ContactPage />} />
          <Route path="/account" element={<ContactPage />} />
          <Route path="/account/login" element={<ContactPage />} />
          <Route path="/policies/:policy" element={<PolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Storefront />
    </BrowserRouter>
  );
}
