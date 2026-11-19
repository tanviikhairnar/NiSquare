import { Link } from 'react-router-dom';

interface HomeCategoryCard {
  title: string;
  description: string;
  image: string;
  href: string;
  tag: string;
}

const homeCategories: HomeCategoryCard[] = [
  {
    title: 'Trousseau & Wedding Hampers',
    description: 'Thoughtfully presented wedding essentials, curated hampers and trousseau arrangements for the celebrations leading up to your big day.',
    image: '/assets/images/optimized/catalog/IMG_8703.webp',
    href: '/collections/trousseau-wedding-hampers',
    tag: '5 styles',
  },
  {
    title: 'Return Favours',
    description: 'Memorable little gestures, beautifully presented for the people who make your celebrations special.',
    image: '/assets/images/optimized/catalog/IMG_0709.webp',
    href: '/collections/return-favours',
    tag: '3 styles',
  },
  {
    title: 'Floral & Occasion Gifting',
    description: 'Flowers, hampers and thoughtful combinations that bring a little more beauty to life\'s special moments.',
    image: '/assets/images/optimized/catalog/IMG_7051.webp',
    href: '/collections/seasonal-occasion-gifting',
    tag: '4 styles',
  },
  {
    title: 'Wedding Invitations',
    description: 'Customised wedding invitations, boxed invites, and presentation hampers crafted for your special day.',
    image: '/assets/images/optimized/catalog/IMG_4525.webp',
    href: '/collections/trousseau-wedding-hampers/wedding-hampers',
    tag: 'Bespoke',
  },
  {
    title: 'Bridesmaid Hampers',
    description: 'Curated gift boxes and pamper hampers designed to celebrate and thank your closest friends.',
    image: '/assets/images/optimized/catalog/IMG_0651.webp',
    href: '/collections/trousseau-wedding-hampers/bridesmaid-gifts',
    tag: 'Bespoke',
  },
  {
    title: 'Baby Shower Gifting',
    description: 'Gentle pastel hampers, mom-to-be gifts, and celebratory birth announcement keepsakes.',
    image: '/assets/images/optimized/catalog/IMG_4732.webp',
    href: '/collections/trousseau-wedding-hampers/baby-hampers',
    tag: 'Bespoke',
  },
];

export default function CategoryGrid() {
  return (
    <section id="home-categories" className="home-categories" aria-labelledby="home-categories-title">
      <div className="ni-decoration-layer" aria-hidden="true">
        <img
          src="/assets/decorations/botanical-bloom-hanging.webp"
          alt=""
          className="ni-motif motif-tl-bloom-hanging"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/assets/decorations/stardust-constellation-b.webp"
          alt=""
          className="ni-motif motif-br-stardust-perched"
          loading="lazy"
          decoding="async"
        />
        <img
          src="/assets/decorations/bird-perched.webp"
          alt=""
          className="ni-motif motif-br-bird-perched"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="home-categories-inner">
        <div className="home-categories-intro">
          <span className="home-categories-pill">Curated Collections</span>
          <h2 id="home-categories-title">Gifting, for every kind of occasion.</h2>
          <p>Every celebration calls for something different. Explore our collection of gifting creations, from wedding celebrations and thoughtful favours to floral arrangements and personalised hampers.</p>
        </div>
        <div className="home-category-stage">
          <div className="home-category-grid" role="list" aria-label="Gifting categories">
            {homeCategories.map((collection, index) => {
              return (
                <article className="home-category-card" key={collection.title} role="listitem">
                  <Link className="home-category-image" to={collection.href} aria-label={'Explore ' + collection.title}>
                    <img src={collection.image} alt={`${collection.title} - luxury gift packaging and hampers by NI Square Packaging`} loading={index < 3 ? 'eager' : 'lazy'} fetchPriority={index < 3 ? 'high' : 'auto'} decoding="async" />
                    <span className="home-category-shade" aria-hidden="true" />
                    <span className="home-category-tag">{collection.tag}</span>
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

