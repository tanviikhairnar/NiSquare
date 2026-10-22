import React from 'react';
import { Link } from 'react-router-dom';
import { collectionPath, storeCollections } from '../../data/storeCatalog';

export default function CategoryGrid() {
  return (
    <section className="home-categories" aria-labelledby="home-categories-title">
      <div className="home-categories-inner">
        <div className="home-categories-intro">
          <span className="home-categories-pill">Curated Collections</span>
          <h2 id="home-categories-title">Explore by Gifting Category</h2>
          <p>Bespoke hampers, thoughtful packaging, and handcrafted details for every moment.</p>
        </div>
        <div className="home-category-stage">
          <div className="home-category-grid" role="list" aria-label="Gifting categories">
            {storeCollections.map((collection, index) => {
              const count = collection.subcategories?.length || 0;
              return (
                <article className="home-category-card" key={collection.slug} role="listitem">
                  <Link className="home-category-image" to={collectionPath(collection.slug)} aria-label={'Explore ' + collection.title}>
                    <img src={collection.image} alt="" loading={index < 3 ? 'eager' : 'lazy'} fetchPriority={index < 3 ? 'high' : 'auto'} decoding="async" />
                    <span className="home-category-shade" aria-hidden="true" />
                    <span className="home-category-tag">{count} {count === 1 ? 'style' : 'styles'}</span>
                    <span className="home-category-content">
                      <span className="home-category-title">{collection.title}</span>
                      <span className="home-category-desc">{collection.description}</span>
                      <span className="home-category-link">Explore category<span className="home-category-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span></span>
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

