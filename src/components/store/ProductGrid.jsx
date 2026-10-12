import React from 'react';
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
        {product.rating && <span className="product-rating" aria-label={`Rated ${product.rating} out of 5`}><span aria-hidden="true">★★★★★</span><span className="rating-number">({product.rating})</span></span>}
      </div>
    </article>
  );
}

export default function ProductGrid({ products, emptyMessage = 'No products found.' }) {
  if (!products.length) return <p className="store-empty-state">{emptyMessage}</p>;
  return <div className="store-product-grid">{products.map((product) => <ProductCard key={`${product.id}-${product.href}`} product={product} />)}</div>;
}
