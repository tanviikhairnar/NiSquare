
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import Home from './pages/Home';
import {
  AccountPage, CartPage, CheckoutPage, CollectionPage, CollectionsPage, ContactPage,
  NotFoundPage, PolicyPage, ProductPage, SearchPage, ServicesPage, StoryPage, WishlistPage,
} from './pages/StorePages';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/login" element={<AccountPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/policies/:policy" element={<PolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider><Storefront /></WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

