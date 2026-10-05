import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice, searchProducts } from '../../data/storeCatalog';

export default function SearchDialog({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const input = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const navigate = useNavigate();
  const matches = searchProducts(query).slice(0, 5);
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const keydown = (event) => { if (event.key === 'Escape') closeRef.current(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', keydown);
    window.requestAnimationFrame(() => input.current?.focus());
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', keydown); };
  }, [isOpen]);
  const submit = (event) => {
    event.preventDefault();
    const value = query.trim();
    onClose();
    navigate(value ? '/search?q=' + encodeURIComponent(value) : '/search');
  };
  if (!isOpen) return null;
  return <div className="store-search-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="store-search-dialog" role="dialog" aria-modal="true" aria-label="Search products">
      <div className="store-search-dialog-header">
        <form className="store-search-dialog-form" onSubmit={submit}>
          <label className="sr-only" htmlFor="header-search-input">Search products</label>
          <input ref={input} id="header-search-input" type="search" placeholder="Search for..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <button type="submit" aria-label="Submit search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7.5" /><path d="m17 17 5 5" /></svg></button>
        </form>
        <button type="button" className="store-search-close" onClick={onClose} aria-label="Close search">×</button>
      </div>
      {query.trim() && <div className="store-search-suggestions" aria-live="polite">
        <p>{matches.length ? 'Products' : 'No matching products'}</p>
        {matches.map((product) => <Link to={product.href} key={product.href} onClick={onClose}><img src={product.image} alt="" /><span>{product.name}</span><span>{formatPrice(product.price)}</span></Link>)}
        {matches.length > 0 && <button type="button" className="text-link" onClick={submit}>View all results</button>}
      </div>}
    </section>
  </div>;
}