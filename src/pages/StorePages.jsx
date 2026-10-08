import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import CollectionBrowser from './CollectionBrowser';
import ProductDetailsPage from './ProductDetailsPage';
import ProductGrid from '../components/store/ProductGrid';
import { CompanyIntroduction, CompanyStory, FoundersSection, ServicesSection, OccasionsSection } from '../components/home/NIStorySections';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { catalogProducts, formatPrice, searchProducts, storeCollections } from '../data/storeCatalog';

function PageTitle({ eyebrow, title, description }) {
  return <header className="store-page-title">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description && <p>{description}</p>}</header>;
}

function Breadcrumbs({ current }) {
  return <nav className="store-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>{current}</span></nav>;
}

export function CollectionsPage() {
  return (
    <section className="store-page">
      <div className="store-page-inner">
        <Breadcrumbs current="Shop" />
        <PageTitle eyebrow="Find your favourites" title="Shop all collections" description="Browse the collections and discover a piece for every occasion." />
        <div className="store-collection-grid">
          {storeCollections.map((collection) => (
            <Link className="store-collection-card" to={`/collections/${collection.slug}`} key={collection.slug}>
              <span className="store-collection-image"><img src={collection.image} alt="" loading="lazy" /></span>
              <span className="store-collection-card-copy"><strong>{collection.title}</strong><span>{collection.description}</span><span className="text-link">Explore collection</span></span>
            </Link>
          ))}
        </div>
        <div className="store-page-cta"><Link className="button" to="/collections/tableware">Shop tableware</Link></div>
      </div>
    </section>
  );
}

export function CollectionPage() { return <CollectionBrowser />; }

export function ProductPage() { return <ProductDetailsPage />; }

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  useEffect(() => setQuery(searchParams.get('q') || ''), [searchParams]);
  const results = searchProducts(searchParams.get('q') || '');
  const submit = (event) => { event.preventDefault(); setSearchParams(query.trim() ? { q: query.trim() } : {}); };
  return <section className="store-page"><div className="store-page-inner store-page-inner--wide"><Breadcrumbs current="Search" /><PageTitle eyebrow="Find something special" title="Search" description="Search products by name or collection." /><form className="store-search-form" onSubmit={submit}><label className="sr-only" htmlFor="store-search-input">Search products</label><input id="store-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /><button type="submit" className="button">Search</button></form>{searchParams.get('q') && <><p className="store-results-count">{results.length} results for â€œ{searchParams.get('q')}â€</p><ProductGrid products={results} emptyMessage="No products matched that search. Try another name." /></>}</div></section>;
}

export function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();
  return <section className="store-page"><div className="store-page-inner store-page-inner--wide"><Breadcrumbs current="Your cart" /><PageTitle eyebrow="Your selection" title="Your cart" description="Review your items before continuing." />{items.length ? <><div className="store-cart-lines">{items.map((item) => <article className="store-cart-line" key={item.id}><a href={item.href}><img src={item.image} alt="" /></a><div className="store-cart-line-info"><a href={item.href}>{item.name}</a><p>{formatPrice(item.price)}</p><div className="quantity-control"><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>âˆ’</button><span>{item.quantity}</span><button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button></div></div><strong>{formatPrice(item.price * item.quantity)}</strong><button className="text-link" type="button" onClick={() => removeItem(item.id)}>Remove</button></article>)}</div><div className="store-cart-summary"><p><span>Subtotal</span><strong>{formatPrice(total)}</strong></p><small>Shipping and any applicable taxes are confirmed before purchase.</small><Link className="button" to="/checkout">Continue to checkout</Link><Link className="text-link" to="/collections/tableware">Continue shopping</Link></div></> : <div className="store-empty-state"><p>Your cart is currently empty.</p><Link className="button" to="/collections/tableware">Continue shopping</Link></div>}</div></section>;
}

export function WishlistPage() {
  const { ids } = useWishlist();
  const products = catalogProducts.filter((product) => ids.includes(product.id));
  return <section className="store-page"><div className="store-page-inner store-page-inner--wide"><Breadcrumbs current="Wishlist" /><PageTitle eyebrow="Saved for later" title="Your wishlist" description="Keep your favourite pieces close at hand." /><ProductGrid products={products} emptyMessage="You haven't saved any favourites yet. Add one with the heart on a product card." /></div></section>;
}

export function AccountPage() {
  const [submitted, setSubmitted] = useState(false);
  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow"><Breadcrumbs current="Account" /><PageTitle eyebrow="Welcome back" title="Your account" description="Sign in to view your orders and saved details." />{submitted ? <p className="store-form-status" role="status">Customer account sign-in is not connected in this local storefront yet.</p> : <form className="store-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label htmlFor="account-email">Email address</label><input id="account-email" name="email" type="email" autoComplete="email" required /><button className="button" type="submit">Continue</button><p className="store-form-note">Account access requires a customer service integration.</p></form>}</div></section>;
}

export function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderSubtotal, setOrderSubtotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const placeOrder = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const payload = {
      email: form.get('email'),
      name: form.get('name'),
      address: form.get('address'),
      city: form.get('city'),
      postalCode: form.get('postal'),
      phone: form.get('phone'),
      items: items.map(({ id, quantity }) => ({ id, quantity })),
    };
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'The order could not be saved.');
      setOrderNumber(result.orderId);
      setOrderSubtotal(result.subtotal);
      clearCart();
    } catch (requestError) {
      setError(requestError.message || 'The server is unavailable. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderNumber) return <section className="store-page"><div className="store-page-inner store-page-inner--narrow store-order-success"><p className="eyebrow">Order saved</p><h1>Thank you</h1><p>Your order reference is <strong>{orderNumber}</strong>.</p><p>Server-confirmed subtotal: <strong>{formatPrice(orderSubtotal)}</strong>.</p><p>Your order is saved as pending payment. No payment has been collected.</p><Link className="button" to="/">Return home</Link></div></section>;
  if (!items.length) return <section className="store-page"><div className="store-page-inner store-page-inner--narrow"><PageTitle title="Checkout" description="Your cart is empty." /><Link className="button" to="/collections/tableware">Browse products</Link></div></section>;
  return <section className="store-page"><div className="store-page-inner store-page-inner--wide"><Breadcrumbs current="Checkout" /><PageTitle eyebrow="Checkout preview" title="Delivery details" description="Enter delivery details to save your order." /><div className="store-checkout-layout"><form className="store-form" onSubmit={placeOrder}><label htmlFor="checkout-email">Email address</label><input id="checkout-email" name="email" type="email" autoComplete="email" required /><label htmlFor="checkout-name">Full name</label><input id="checkout-name" name="name" autoComplete="name" required /><label htmlFor="checkout-address">Address</label><input id="checkout-address" name="address" autoComplete="street-address" required /><div className="store-form-row"><div><label htmlFor="checkout-city">City</label><input id="checkout-city" name="city" autoComplete="address-level2" required /></div><div><label htmlFor="checkout-postal">Postal code</label><input id="checkout-postal" name="postal" autoComplete="postal-code" required /></div></div><label htmlFor="checkout-phone">Phone</label><input id="checkout-phone" name="phone" type="tel" autoComplete="tel" required /><p className="store-form-note">This creates a pending order in the local backend. Payment is not enabled.</p>{error && <p className="store-form-status" role="alert">{error}</p>}<button type="submit" className="button" disabled={submitting}>{submitting ? 'Saving orderâ€¦' : 'Save order'}</button></form><aside className="store-order-summary"><h2>Order summary</h2>{items.map((item) => <p key={item.id}><span>{item.name} Ã— {item.quantity}</span><strong>{formatPrice(item.price * item.quantity)}</strong></p>)}<p className="store-order-total"><span>Subtotal</span><strong>{formatPrice(total)}</strong></p></aside></div></div></section>;
}

export function StoryPage() {
  return <main className="ni-brand-story-page"><CompanyIntroduction /><CompanyStory /><FoundersSection /></main>;
}
export function ServicesPage() {
  return <main className="ni-brand-story-page"><ServicesSection /><OccasionsSection /></main>;
}
export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submitMessage = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          message: form.get('message'),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Your message could not be saved.');
      setSubmitted(true);
    } catch (requestError) {
      setError(requestError.message || 'The server is unavailable. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow"><Breadcrumbs current="Contact" /><PageTitle eyebrow="We are here to help" title="Contact us" description="Questions about a product, gift, or order? Send our team a note." /><div className="store-contact-layout"><div><h2>Get in touch</h2><p>Use the form to share your question and our team will be happy to help.</p><p>Send our team a message using the form.</p></div>{submitted ? <p className="store-form-status" role="status">Thanks for your message. It has been saved in the local backend; email delivery is not configured.</p> : <form className="store-form" onSubmit={submitMessage}><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" maxLength="120" required /><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" maxLength="254" required /><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows="5" minLength="5" maxLength="10000" required />{error && <p className="store-form-status" role="alert">{error}</p>}<button type="submit" className="button" disabled={submitting}>{submitting ? 'Sendingâ€¦' : 'Send message'}</button></form>}</div></div></section>;
}

export function PolicyPage() {
  const { policy = '' } = useParams();
  const policies = {
    'shipping-policy': ['Shipping information', 'Please contact the store team for current delivery estimates, shipping options, and order support.'],
    'refund-policy': ['Returns and exchanges', 'Please contact the store team with your order details before arranging a return or exchange.'],
    'privacy-policy': ['Privacy information', 'This local development storefront saves contact messages, email subscriptions, and pending order details to a local SQLite database. Payment and customer accounts are not enabled.'],
    'terms-of-service': ['Terms of service', 'Orders may be saved as pending in the local development database. Payment processing and customer account services are not active.'],
  };
  const [title, description] = policies[policy] || ['Store information', 'Contact the store team if you need help.'];
  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow"><Breadcrumbs current={title} /><PageTitle eyebrow="Information" title={title} /><div className="store-policy-copy"><p>{description}</p><p>For assistance, please <Link to="/pages/contact">contact us</Link>.</p></div></div></section>;
}

export function NotFoundPage({ title = 'Page not found' }) {
  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow store-not-found"><p className="eyebrow">404</p><h1>{title}</h1><p>The page you are looking for may have moved.</p><Link className="button" to="/">Return home</Link></div></section>;
}
