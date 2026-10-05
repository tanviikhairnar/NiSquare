
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { featuredDinnerSet } from '../../data/products';

const formatPrice = (price) => 'Rs. ' + price.toLocaleString('en-IN') + '.00';

export default function FeaturedProduct() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, closeCart } = useCart();
  const navigate = useNavigate();

  return (
    <section className="featured-product-section" aria-labelledby="featured-dinner-heading">
      <h2 className="featured-section-title">Featured Product</h2>
      <div className="featured-product-inner">
        <div className="featured-gallery-thumbnails" aria-label="Product images">
          {featuredDinnerSet.images.map((image, index) => (
            <button
              type="button"
              className={index === activeImage ? 'gallery-thumb is-active' : 'gallery-thumb'}
              onClick={() => setActiveImage(index)}
              aria-label={'Show product image ' + (index + 1)}
              key={image}
            >
              <img src={image} alt="" loading="lazy" />
            </button>
          ))}
        </div>
        <div className="featured-product-gallery">
          <img src={featuredDinnerSet.images[activeImage]} alt={featuredDinnerSet.name} loading="lazy" />
        </div>
        <div className="featured-product-copy">
          <p className="featured-brand">NI Square Packaging</p>
          <h3 id="featured-dinner-heading">{featuredDinnerSet.name}</h3>
          <div className="featured-price-line">
            <p className="featured-price">{formatPrice(featuredDinnerSet.price)}</p>
            <p className="featured-rating" aria-label={'Rated ' + featuredDinnerSet.rating + ' out of 5'}><span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span>({featuredDinnerSet.rating})</span></p>
          </div>
          <div className="quantity-control" aria-label="Quantity">
            <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>âˆ’</button>
            <span aria-live="polite">{quantity}</span>
            <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}>+</button>
          </div>
          <button type="button" className="button button--outline featured-add-button" onClick={() => addItem(featuredDinnerSet, quantity)}>Add to cart</button>
          <button type="button" className="button button--outline featured-buy-button" onClick={() => { addItem(featuredDinnerSet, quantity); closeCart(); navigate('/checkout'); }}>Buy it now</button>
          <div className="featured-details-rule" />
        </div>
      </div>
    </section>
  );
}

