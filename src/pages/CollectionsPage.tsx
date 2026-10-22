import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PageTitle from '../components/common/PageTitle';
import WhatsAppContactLink from '../components/WhatsAppContactLink';
import { storeCollections } from '../data/storeCatalog';

export default function CollectionsPage() {
  return (
    <section className="store-page">
      <div className="store-page-inner">
        <Breadcrumbs current="Gifting categories" />
        <PageTitle
          eyebrow="Made for your moments"
          title="Explore our gifting categories"
          description="Choose a category to see its subcategories and gifting ideas."
        />
        <div className="store-collection-grid">
          {storeCollections.map((category) => (
            <Link className="store-collection-card" to={'/collections/' + category.slug} key={category.slug}>
              <span className="store-collection-image">
                <img src={category.image} alt={category.title + ' gifting work sample'} loading="lazy" decoding="async" />
              </span>
              <span className="store-collection-card-copy">
                <strong>{category.title}</strong>
                <span>{category.description}</span>
                <span className="text-link">Explore category</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="store-page-cta">
          <WhatsAppContactLink className="button" message="Hi, I’d like to explore your gifting categories and plan a hamper.">
            Chat with our founders
          </WhatsAppContactLink>
        </div>
      </div>
    </section>
  );
}

