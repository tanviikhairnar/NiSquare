import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGallery from '../components/store/ProductGallery';
import ProductRail from '../components/home/ProductRail';
import WhatsAppContactLink from '../components/WhatsAppContactLink';

import { catalogProducts, getProductByHandle } from '../data/storeCatalog';

export default function ProductDetailsPage() {
  const { handle = '' } = useParams();
  const product = getProductByHandle(handle);
  if (!product) return <section className="store-page"><div className="store-page-inner store-not-found"><h1>Product not found</h1><Link className="button" to="/">Return home</Link></div></section>;
  const related = catalogProducts.filter((item) => item.id !== product.id).slice(0, 4);
  return <>
    <section className="store-page store-product-page"><div className="store-page-inner store-page-inner--wide">
      <nav className="store-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/collections/tableware">Shop</Link><span>/</span><span>{product.name}</span></nav>
      <div className="store-product-detail">
        <ProductGallery product={product} />
        <div className="store-product-copy">
          <p className="eyebrow">NI Square Packaging</p><h1>{product.name}</h1>
          <WhatsAppContactLink className="button store-wide-button" message={`Hi, I am interested in ${product.name}. Could you share more details?`}>Enquire on WhatsApp</WhatsAppContactLink>
          <p className="store-product-note">Need help choosing? <Link to="/pages/contact">Contact our team</Link>.</p>
          <details className="store-accordion" open><summary>Product details</summary><p>{product.description || 'A thoughtfully selected product from NI Square Packaging. Contact us if you need additional specifications before ordering.'}</p></details>
          <details className="store-accordion"><summary>Wash &amp; care</summary><p>For care guidance specific to this item, please contact our team before use.</p></details>
          <details className="store-accordion"><summary>Shipping &amp; handling</summary><p>Shipping options and delivery estimates are confirmed with your order. <Link to="/policies/shipping-policy">Read the shipping policy</Link>.</p></details>
          <details className="store-accordion"><summary>Queries or assistance</summary><p>Our team can help with product questions and gifting enquiries. <Link to="/pages/contact">Get in touch</Link>.</p></details>
          <details className="store-accordion"><summary>More information</summary><p>Every piece is selected for its design and the moments it brings to the table.</p></details>
        </div>
      </div>
      <section className="store-product-reviews" id="product-reviews"><h2>Customer reviews</h2>
        {product.rating ? <p><span>&#9733;&#9733;&#9733;&#9733;&#9733;</span> <strong>{product.rating}</strong> out of 5</p> : <p>Be the first to share feedback about this piece.</p>}
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
