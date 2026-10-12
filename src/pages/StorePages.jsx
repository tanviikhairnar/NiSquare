import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import WhatsAppContactLink from '../components/WhatsAppContactLink';
import { CompanyIntroduction, CompanyStory, FoundersSection, ServicesSection, OccasionsSection } from '../components/home/NIStorySections';
import { searchCollections, storeCollections } from '../data/storeCatalog';

const anchor = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function PageTitle({ eyebrow, title, description }) {
  return <header className="store-page-title">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description && <p>{description}</p>}</header>;
}
function Breadcrumbs({ current }) {
  return <nav className="store-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>{current}</span></nav>;
}
export function CollectionsPage() {
  return <section className="store-page"><div className="store-page-inner">
    <Breadcrumbs current="Gifting categories" />
    <PageTitle eyebrow="Made for your moments" title="Explore our gifting categories" description="Choose a category to see its subcategories and gifting ideas." />
    <div className="store-collection-grid">{storeCollections.map((category) => <Link className="store-collection-card" to={'/collections/' + category.slug} key={category.slug}>
      <span className="store-collection-image"><img src={category.image} alt="" loading="lazy" /></span>
      <span className="store-collection-card-copy"><strong>{category.title}</strong><span>{category.description}</span><span className="text-link">Explore category</span></span>
    </Link>)}</div>
    <div className="store-page-cta"><WhatsAppContactLink className="button" message="Hi, I’d like to explore your gifting categories and plan a hamper.">Chat with our founders</WhatsAppContactLink></div>
  </div></section>;
}
export function CollectionPage() {
  const { handle = '' } = useParams();
  const category = storeCollections.find((item) => item.slug === handle);
  if (!category) return <NotFoundPage />;
  return <section className="store-page"><div className="store-page-inner store-page-inner--wide">
    <nav className="store-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/collections">Gifting categories</Link><span>/</span><span>{category.title}</span></nav>
    <PageTitle eyebrow="Explore by occasion" title={category.title} description={category.description} />
    <div className="category-detail-grid">{category.subcategories.map((item) => <article className="category-detail-card" id={'subcategory-' + anchor(item.title)} key={item.title}>
      <div className="category-detail-image"><img src={item.image} alt={item.title} loading="lazy" /></div>
      <div className="category-detail-copy"><h2>{item.title}</h2><WhatsAppContactLink className="category-whatsapp-link" message={'Hi, I’d like to ask about ' + item.title + ' in ' + category.title + '.'}>Enquire on WhatsApp</WhatsAppContactLink></div>
    </article>)}</div>
    {category.note && <p className="gifting-category-note category-detail-note">{category.note}</p>}
    <div className="store-page-cta"><WhatsAppContactLink className="button" message={'Hi, I’d like to plan something from your ' + category.title + ' category.'}>Plan this gift on WhatsApp</WhatsAppContactLink></div>
  </div></section>;
}
function SearchResults({ initialQuery, onQueryChange }) {
  const [query, setQuery] = useState(initialQuery);
  const results = searchCollections(initialQuery);
  return <section className="store-page"><div className="store-page-inner store-page-inner--wide">
    <Breadcrumbs current="Search" /><PageTitle eyebrow="Find something special" title="Search gifting categories" description="Search our categories and occasions." />
    <form className="store-search-form" onSubmit={(event) => { event.preventDefault(); onQueryChange(query.trim()); }}>
      <label className="sr-only" htmlFor="store-search-input">Search gifting categories</label>
      <input id="store-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search categories or occasions" />
      <button className="button" type="submit">Search</button>
    </form>
    {initialQuery && <><p className="store-results-count">{results.length} results for “{initialQuery}”</p>
      {results.length ? <div className="store-collection-grid">{results.map((item) => <Link className="store-collection-card" to={item.href} key={item.href}>
        <span className="store-collection-image"><img src={item.image} alt="" loading="lazy" /></span><span className="store-collection-card-copy"><strong>{item.title}</strong><span>{item.description}</span><span className="text-link">Explore category</span></span>
      </Link>)}</div> : <p>No categories matched. Try another occasion.</p>}
    </>}
  </div></section>;
}
export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  return <SearchResults key={query} initialQuery={query} onQueryChange={(value) => setParams(value ? { q: value } : {})} />;
}
export function StoryPage() { return <main className="ni-brand-story-page"><CompanyIntroduction /><CompanyStory /><FoundersSection /></main>; }
export function ServicesPage() { return <main className="ni-brand-story-page"><ServicesSection /><OccasionsSection /></main>; }
export function ContactPage() {
  const founders = ['Nikita Kochar Ostwal', 'Nikita Anil Chordiya'];
  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow"><Breadcrumbs current="Contact" />
    <PageTitle eyebrow="We are here to help" title="Chat with our founders" description="Questions about a product, gift, or order? Share a few details and message us on WhatsApp." />
    <div className="store-contact-layout"><div><h2>Plan something personal</h2><p>Tell us about your occasion, then choose a founder to continue on WhatsApp.</p></div>
      <div className="store-contact-actions">{founders.map((name) => <WhatsAppContactLink className="button" key={name} message="Hi, I would like to plan a hamper.">Message {name}</WhatsAppContactLink>)}</div>
    </div>
  </div></section>;
}
export function PolicyPage() {
  const { policy = '' } = useParams();
  const policies = {
    'shipping-policy': ['Shipping information', 'Contact us on WhatsApp to discuss delivery options, service areas, timelines, and charges for your hamper.'],
    'refund-policy': ['Returns and cancellations', 'Hampers are planned and prepared to order. Please contact us on WhatsApp before confirming an arrangement so we can discuss its details.'],
    'privacy-policy': ['Privacy information', 'When you submit the enquiry form, your details are added to a message for the founder you choose. This website does not store or submit that enquiry. After you continue, WhatsApp handles the message under its own privacy terms.'],
    'terms-of-service': ['Terms of service', 'This website showcases gifting categories and does not take online orders or payments. Contact us on WhatsApp to discuss customisation, pricing, availability, delivery, and booking.'],
  };
  const [title, description] = policies[policy] || ['Store information', 'Contact us on WhatsApp if you need help.'];
  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow"><Breadcrumbs current={title} /><PageTitle eyebrow="Information" title={title} /><div className="store-policy-copy"><p>{description}</p><p>For assistance, please <Link to="/pages/contact">contact us</Link>.</p></div></div></section>;
}
export function NotFoundPage({ title = 'Page not found' }) {
  return <section className="store-page"><div className="store-page-inner store-page-inner--narrow store-not-found"><p className="eyebrow">404</p><h1>{title}</h1><p>The page you are looking for may have moved.</p><Link className="button" to="/">Return home</Link></div></section>;
}
