import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SEOHead from './components/layout/SEOHead';
import PagePreloader from './components/common/PagePreloader';
import { WhatsAppModalProvider } from './context/WhatsAppModalProvider';
import Home from './pages/Home';
import CollectionsPage from './pages/CollectionsPage';
import CollectionPage from './pages/CollectionPage';
import SubcategoryPage from './pages/SubcategoryPage';
import SearchPage from './pages/SearchPage';
import StoryPage from './pages/StoryPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop(): null {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
}

function Storefront() {
  return (
    <div className="app-root features--button-transition features--zoom-image">
      <PagePreloader />
      <ScrollToTop />
      <SEOHead />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:handle" element={<CollectionPage />} />
          <Route path="/collections/:handle/:subcategoryHandle" element={<SubcategoryPage />} />
          <Route path="/products/:handle" element={<Navigate to="/collections" replace />} />
          <Route path="/pages/our-story" element={<StoryPage />} />
          <Route path="/about" element={<StoryPage />} />
          <Route path="/pages/services" element={<ServicesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pages/work" element={<CollectionsPage />} />
          <Route path="/work" element={<CollectionsPage />} />
          <Route path="/pages/corporate-gifting" element={<ServicesPage />} />
          <Route path="/pages/birth-announcement-gifts" element={<ServicesPage />} />
          <Route path="/pages/contact" element={<ContactPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<Navigate to="/collections" replace />} />
          <Route path="/checkout" element={<Navigate to="/collections" replace />} />
          <Route path="/account/*" element={<Navigate to="/pages/contact" replace />} />
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
      <WhatsAppModalProvider>
        <Storefront />
      </WhatsAppModalProvider>
    </BrowserRouter>
  );
}

