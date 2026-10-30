import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SEOHead from './components/layout/SEOHead';
import PagePreloader from './components/common/PagePreloader';
import { WhatsAppModalProvider } from './context/WhatsAppModalProvider';
import Home from './pages/Home';
import CollectionPage from './pages/CollectionPage';
import SubcategoryPage from './pages/SubcategoryPage';
import SearchPage from './pages/SearchPage';
import StoryPage from './pages/StoryPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';
import NotFoundPage from './pages/NotFoundPage';

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function ScrollToTop(): null {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'smooth' });
        return true;
      }
      return false;
    };

    if (!scrollToTarget()) {
      const timer = window.setTimeout(scrollToTarget, 100);
      return () => window.clearTimeout(timer);
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
          <Route path="/collections" element={<Navigate to="/#home-categories" replace />} />
          <Route path="/collections/:handle" element={<CollectionPage />} />
          <Route path="/collections/:handle/:subcategoryHandle" element={<SubcategoryPage />} />
          <Route path="/products/:handle" element={<Navigate to="/collections" replace />} />
          <Route path="/pages/our-story" element={<StoryPage />} />
          <Route path="/about" element={<StoryPage />} />
          <Route path="/pages/services" element={<ServicesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pages/work" element={<Navigate to="/#home-categories" replace />} />
          <Route path="/work" element={<Navigate to="/#home-categories" replace />} />
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

