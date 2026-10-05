import React from 'react';

const featuredCollections = [
  {
    title: 'Tableware',
    href: '/collections/tableware',
    image: 'https://www.studio13.co.in/cdn/shop/files/tableware.jpg?v=1683441484&width=1800',
  },
  {
    title: 'Collections',
    href: '/collections',
    image: 'https://www.studio13.co.in/cdn/shop/files/full-collection_927b913c-43f3-4103-90a0-fc8ed4a30727.jpg?v=1717495993&width=1200',
  },
  {
    title: 'Stationery',
    href: '/collections/all-stationery',
    image: 'https://www.studio13.co.in/cdn/shop/files/stationerynavy2.jpg?v=1695884131&width=1500',
  },
  {
    title: 'Gifting',
    href: '/collections/gifting',
    image: 'https://www.studio13.co.in/cdn/shop/files/box1_96a6c2d3-7c09-4621-9f7c-e9d7053954d9.jpg?v=1763449735&width=1500',
  },
];

export default function CategoryGrid() {
  return (
    <section className="home-categories" aria-label="Shop by collection">
      <div className="home-category-grid">
        {featuredCollections.map((collection) => (
          <a className="home-category-card collection-card group" href={collection.href} key={collection.title}>
            <div className="home-category-media content-over-media content-over-media--auto">
              <img className="zoom-image group-hover:zoom" src={collection.image} alt={collection.title} loading="lazy" />
              <div className="home-category-content collection-card__content prose prose--tight place-self-center text-center">
                <span className="home-category-title">{collection.title}</span>
                <span className="home-category-cta">View products</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}



