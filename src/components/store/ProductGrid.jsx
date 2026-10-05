import React from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../data/storeCatalog';

function ProductCard({ product, addItem }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const saved = isWishlisted(product.id);
  const savings = product.compareAt ? product.compareAt - product.price : 0;

  return (
    <article className="product-card">
      <div className="product-card__figure product-card-figure">
        <a className="product-card-image product-card__media" href={product.href} aria-label={product.name}>
          <img className="product-primary product-card__image product-card__image--primary" src={product.image} alt={product.name} loading="lazy" />
          {product.secondaryImage && <img className="product-secondary product-card__image product-card__image--secondary" src={product.secondaryImage} alt="" loading="lazy" />}
        </a>
        {savings > 0 && <span className="product-badge">Save {formatPrice(savings)}</span>}
        <button type="button" className={`wishlist-heart${saved ? ' is-wishlisted' : ''}`} aria-label={`${saved ? 'Remove' : 'Add'} ${product.name} ${saved ? 'from' : 'to'} wishlist`} aria-pressed={saved} onClick={() => toggleWishlist(product.id)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></svg>
        </button>
        <button type="button" className="product-card__quick-add-button" aria-label={`Add ${product.name} to cart`} onClick={() => addItem(product)}>
          <span className="sr-only">Add to cart</span>
          <svg aria-hidden="true" focusable="false" fill="none" width="16" viewBox="0 0 16 16"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
      </div>
      <div className="product-card-info product-card__info">
        <a href={product.href} className="product-name">{product.name}</a>
        <div className={`product-price ${product.compareAt ? 'is-sale' : ''}`}>
          <span>{formatPrice(product.price)}</span>
          {product.compareAt && <del>{formatPrice(product.compareAt)}</del>}
        </div>
        {product.rating && <span className="product-rating" aria-label={`Rated ${product.rating} out of 5`}><span aria-hidden="true">★★★★★</span><span className="rating-number">({product.rating})</span></span>}
      </div>
    </article>
  );
}

export default function ProductGrid({ products, emptyMessage = 'No products found.' }) {
  const { addItem } = useCart();
  if (!products.length) return <p className="store-empty-state">{emptyMessage}</p>;
  return <div className="store-product-grid">{products.map((product) => <ProductCard key={`${product.id}-${product.href}`} product={product} addItem={addItem} />)}</div>;
}
