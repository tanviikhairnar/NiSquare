
import React, { useEffect, useRef, useState } from 'react';
import WhatsAppContactLink from '../WhatsAppContactLink';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card__figure product-card-figure">
        <a className="product-card-image product-card__media" href={product.href} aria-label={product.name}>
          <img className="product-primary product-card__image product-card__image--primary" src={product.image} alt={product.name} loading="lazy" />
          {product.secondaryImage && <img className="product-secondary product-card__image product-card__image--secondary" src={product.secondaryImage} alt="" loading="lazy" />}
        </a>
        <WhatsAppContactLink className="product-card__quick-add-button" message={`Hi, I would like to enquire about ${product.name}.`}>WhatsApp</WhatsAppContactLink>
      </div>
      <div className="product-card-info product-card__info">
        <a href={product.href} className="product-name">{product.name}</a>
        {product.rating && <span className="product-rating" aria-label={'Rated ' + product.rating + ' out of 5'}><span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span className="rating-number">({product.rating})</span></span>}
      </div>
    </article>
  );
}

export default function ProductRail({ title, products, collectionHref, className = '' }) {
  const rail = useRef(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const moveRail = (direction) => rail.current?.scrollBy({ left: direction * rail.current.clientWidth * 0.82, behavior: 'smooth' });
  const updateEdges = () => {
    if (!rail.current) return;
    setCanScrollPrevious(rail.current.scrollLeft > 4);
    setCanScrollNext(rail.current.scrollLeft + rail.current.clientWidth < rail.current.scrollWidth - 4);
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateEdges);
    window.addEventListener('resize', updateEdges);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateEdges);
    };
  }, [products]);

  return (
    <section className={'catalog-section ' + className} aria-label={title}>
      <div className="catalog-inner">
        <h2 className="catalog-heading">{title}</h2>
        <div className="product-rail-frame">
          <div className="product-grid" ref={rail} onScroll={updateEdges}>
            {products.map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
          <button type="button" className="rail-arrow rail-arrow--previous" aria-label="Previous products" disabled={!canScrollPrevious} onClick={() => moveRail(-1)}>
            <svg viewBox="0 0 16 18" aria-hidden="true"><path d="M11 1 3 9l8 8" /></svg>
          </button>
          <button type="button" className="rail-arrow rail-arrow--next" aria-label="Next products" disabled={!canScrollNext} onClick={() => moveRail(1)}>
            <svg viewBox="0 0 16 18" aria-hidden="true"><path d="m5 1 8 8-8 8" /></svg>
          </button>
        </div>
        <a className="catalog-view-all" href={collectionHref}>View All</a>
      </div>
    </section>
  );
}

