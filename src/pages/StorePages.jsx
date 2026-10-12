import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import CollectionBrowser from './CollectionBrowser';
import ProductDetailsPage from './ProductDetailsPage';
import ProductGrid from '../components/store/ProductGrid';
import { CompanyIntroduction, CompanyStory, FoundersSection, ServicesSection, OccasionsSection } from '../components/home/NIStorySections';
import { searchProducts, storeCollections } from '../data/storeCatalog';
import { whatsappLink, WHATSAPP_NUMBERS } from '../lib/whatsapp';

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
  return <section className="store-page"><div className="store-page-inner store-page-inner--wide"><Breadcrumbs current="Search" /><PageTitle eyebrow="Find something special" title="Search" description="Search products by name or collection." /><form className="store-search-form" onSubmit={submit}><label className="sr-only" htmlFor="store-search-input">Search products</label><input id="store-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /><button type="submit" className="button">Search</button></form>{searchParams.get('q') && <><p className="store-results-count">{results.length} results for "{searchParams.get('q')}"</p><ProductGrid products={results} emptyMessage="No products matched that search. Try another name." /></>}</div></section>;
}

export function CartPage() {
  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow"><Breadcrumbs current="Browse products" /><PageTitle title="Explore our collections" description="Browse by category, then message our founders to plan a hamper." /><Link className="button" to="/collections">Browse collections</Link></div></section>;
}

export function AccountPage() {
  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow"><Breadcrumbs current="Account" /><PageTitle title="Chat with our founders" description="For product questions and custom gifting, message us on WhatsApp." /><Link className="button" to="/pages/contact">Contact us on WhatsApp</Link></div></section>;
}

export function CheckoutPage() {
  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow"><Breadcrumbs current="Enquire" /><PageTitle eyebrow="Plan a hamper" title="Tell us what you have in mind" description="We can help you choose products and plan your hamper on WhatsApp." /><Link className="button" to="/pages/contact">Message our founders</Link></div></section>;
}
export function StoryPage() {
  return <main className="ni-brand-story-page"><CompanyIntroduction /><CompanyStory /><FoundersSection /></main>;
}
export function ServicesPage() {
  return <main className="ni-brand-story-page"><ServicesSection /><OccasionsSection /></main>;
}
export function ContactPage() {
  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow"><Breadcrumbs current="Contact" /><PageTitle eyebrow="We are here to help" title="Chat with our founders" description="Questions about a product, gift, or order? Message us on WhatsApp and we can help you plan it." /><div className="store-contact-layout"><div><h2>Plan something personal</h2><p>Choose a founder to start a WhatsApp conversation. Share your occasion, ideas, and budget when ready.</p></div><div className="store-contact-actions">{['Nikita Kochar Ostwal', 'Nikita Anil Chordiya'].map((name, index) => <a className="button" key={name} href={whatsappLink('Hi, I would like to plan a hamper.', WHATSAPP_NUMBERS[index])} target="_blank" rel="noreferrer">Message {name}</a>)}</div></div></div></section>;
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
