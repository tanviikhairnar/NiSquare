import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductGallery from '../components/store/ProductGallery';
import ProductRail from '../components/home/ProductRail';
import { useCart } from '../context/CartContext';
import { catalogProducts, formatPrice, getProductByHandle } from '../data/storeCatalog';

export default function ProductDetailsPage() {
  const { handle = '' } = useParams();
  const product = getProductByHandle(handle);
  const [quantity, setQuantity] = useState(1);
  const { addItem, closeCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => { setQuantity(1); }, [handle]);
  if (!product) return <section className="store-page"><div className="store-page-inner store-not-found"><h1>Product not found</h1><Link className="button" to="/">Return home</Link></div></section>;
  const related = catalogProducts.filter((item) => item.id !== product.id).slice(0, 4);
  const buyNow = () => { addItem(product, quantity); closeCart(); navigate('/checkout'); };
  return <>
    <section className="store-page store-product-page"><div className="store-page-inner store-page-inner--wide">
      <nav className="store-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/collections/tableware">Shop</Link><span>/</span><span>{product.name}</span></nav>
      <div className="store-product-detail">
        <ProductGallery product={product} />
        <div className="store-product-copy">
          <p className="eyebrow">NI Square Packaging</p><h1>{product.name}</h1>
          <div className="store-product-price"><span>{formatPrice(product.price)}</span>{product.compareAt && <del>{formatPrice(product.compareAt)}</del>}
            {product.rating && <span className="product-rating" aria-label={'Rated ' + product.rating + ' out of 5'}><span aria-hidden="true">★★★★★</span><small>({product.rating})</small></span>}
          </div>
          <div className="quantity-control" aria-label="Quantity"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button><span aria-live="polite">{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}>+</button></div>
          <button type="button" className="button button--outline store-wide-button" onClick={() => addItem(product, quantity)}>Add to cart</button>
          <button type="button" className="button store-wide-button" onClick={buyNow}>Buy it now</button>
          <p className="store-product-note">Need help choosing? <Link to="/pages/contact">Contact our team</Link>.</p>
          <details className="store-accordion" open><summary>Product details</summary><p>{product.description || 'A thoughtfully selected product from NI Square Packaging. Contact us if you need additional specifications before ordering.'}</p></details>
          <details className="store-accordion"><summary>Wash &amp; care</summary><p>For care guidance specific to this item, please contact our team before use.</p></details>
          <details className="store-accordion"><summary>Shipping &amp; handling</summary><p>Shipping options and delivery estimates are confirmed with your order. <Link to="/policies/shipping-policy">Read the shipping policy</Link>.</p></details>
          <details className="store-accordion"><summary>Queries or assistance</summary><p>Our team can help with product questions and gifting enquiries. <Link to="/pages/contact">Get in touch</Link>.</p></details>
          <details className="store-accordion"><summary>More information</summary><p>Every piece is selected for its design and the moments it brings to the table.</p></details>
        </div>
      </div>
      <section className="store-product-reviews" id="product-reviews"><h2>Customer reviews</h2>
        {product.rating ? <p><span>★★★★★</span> <strong>{product.rating}</strong> out of 5</p> : <p>Be the first to share feedback about this piece.</p>}
        <p className="store-review-note">Review submissions are not connected in this local storefront.</p><Link to="/pages/contact" className="text-link">Questions about this product?</Link>
      </section>
      <section className="store-product-faq"><h2>Frequently asked questions</h2>
        <details><summary>How long will delivery take?</summary><p>Delivery estimates depend on your location and shipping method. Contact us for an estimate before ordering.</p></details>
        <details><summary>Can I ask a question before ordering?</summary><p>Yes. <Link to="/pages/contact">Contact our team</Link> and include the product name in your message.</p></details>
      </section>
    </div></section>
    <ProductRail title="You may also like" products={related} collectionHref="/collections/tableware" className="catalog-section--arrivals" />
  </>;
}