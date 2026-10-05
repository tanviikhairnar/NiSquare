import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/storeCatalog';

export default function CartDrawer() {
  const { items, isOpen, quantity, total, updateQuantity, removeItem, closeCart } = useCart();

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => { if (event.key === 'Escape') closeCart(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, closeCart]);

  return (
    <>
      <button type="button" className={isOpen ? 'cart-backdrop is-open' : 'cart-backdrop'} aria-label="Close cart" onClick={closeCart} tabIndex={isOpen ? 0 : -1} />
      <aside className={isOpen ? 'cart-drawer is-open' : 'cart-drawer'} aria-label="Shopping cart" aria-hidden={!isOpen}>
        <div className="cart-drawer-header">
          <h2>Your cart <span>({quantity})</span></h2>
          <button type="button" onClick={closeCart} aria-label="Close cart">×</button>
        </div>
        <div className="cart-drawer-items">
          {items.length === 0 ? <p className="cart-empty">Your cart is currently empty.</p> : items.map((item) => (
            <article className="cart-line" key={item.id}>
              <Link to={item.href} onClick={closeCart}><img src={item.image} alt="" /></Link>
              <div>
                <h3><Link to={item.href} onClick={closeCart}>{item.name}</Link></h3>
                <p>{formatPrice(item.price)}</p>
                <div className="cart-quantity-control">
                  <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </article>
          ))}
        </div>
        <div className="cart-drawer-footer">
          <p><span>Subtotal</span><strong>{formatPrice(total)}</strong></p>
          <Link className="button dark-button" to={items.length ? '/checkout' : '/cart'} onClick={closeCart}>Checkout</Link>
          <Link className="cart-view-link" to="/cart" onClick={closeCart}>View cart</Link>
          <small>Local preview only; orders and payments are not processed.</small>
        </div>
      </aside>
    </>
  );
}