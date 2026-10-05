
import React from 'react';
import { useCart } from '../../context/CartContext';

export default function FloatingActions({ isHome = false }) {
  const { quantity, openCart } = useCart();

  return (
    <>
      {!isHome && <button type="button" className="floating-cart" aria-label={'Open cart, ' + quantity + ' items'} onClick={openCart}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
        <span className="floating-cart-count">{quantity}</span>
      </button>}
      <div className="contact-floats">
        {!isHome && <a className="chat-pill" href="/pages/contact">Chat with us</a>}
        {!isHome && <a className="whatsapp-float" href="https://wa.me/?text=Hello%20NI%20Square%20Packaging" aria-label="Chat with NI Square Packaging on WhatsApp" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a12.5 12.5 0 0 0-10.7 18.9L4 29l7.3-1.9A12.5 12.5 0 1 0 16 3Z" /><path d="M12.2 10.1c-.4-.9-.8-.9-1.2-.9h-.9c-.3 0-.8.1-1.2.6-.4.4-1.5 1.5-1.5 3.6s1.5 4.2 1.7 4.5c.2.3 2.9 4.6 7.1 6.2 3.5 1.4 4.2 1.1 5 .9.8-.1 2.5-1 2.9-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.9-.6l-2.7-1.3c-.4-.2-.7-.3-1 .3-.3.5-1.1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.8-.7-3.4-2.2-1.3-1.1-2.2-2.5-2.4-2.9-.3-.4 0-.6.2-.8l.7-.8c.2-.3.3-.4.4-.7.1-.3 0-.5 0-.7l-1.2-2.7Z" /></svg>
        </a>}
      </div>
    </>
  );
}
