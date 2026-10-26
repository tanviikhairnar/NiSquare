import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PageTitle from '../components/common/PageTitle';
import WhatsAppContactLink from '../components/WhatsAppContactLink';
import { storeCollections, subcategoryPath } from '../data/storeCatalog';
import NotFoundPage from './NotFoundPage';

export default function CollectionPage() {
  const { handle = '' } = useParams<{ handle?: string }>();
  const category = storeCollections.find((item) => item.slug === handle);
  if (!category) return <NotFoundPage />;

  return (
    <section className="store-page">
      <div className="store-page-inner store-page-inner--wide">
        <Breadcrumbs current={category.title} paths={[{ label: 'Gifting categories', href: '/collections' }]} />
        <PageTitle eyebrow="Explore by occasion" title={category.title} description={category.description} />
        <div className="category-detail-grid">
          {category.subcategories.map((item, index) => {
            const previewImages = item.galleryPreviewImages?.length ? item.galleryPreviewImages : [item.image];
            const cardVideo = item.galleryVideos?.[0];
            const cardImages = previewImages.slice(0, cardVideo ? 1 : 2);
            return (
              <article className="category-detail-card" key={item.title}>
                <div className={'category-detail-image category-detail-image--' + (cardVideo ? 'video' : cardImages.length > 1 ? 'double' : 'single')}>
                  {cardImages.map((src, imageIndex) => (
                    <img key={src} src={src} alt={item.title + ' gifting detail ' + (imageIndex + 1)} loading="lazy" decoding="async" />
                  ))}
                  {cardVideo && (
                    <video controls playsInline preload="none" poster={cardVideo.poster} aria-label={'Play ' + item.title + ' video'}>
                      <source src={cardVideo.src} />
                    </video>
                  )}
                  <span className="category-detail-image-index">
                    {String(index + 1).padStart(2, '0')} <span>/ {String(category.subcategories.length).padStart(2, '0')}</span>
                  </span>
                  {!cardVideo && <span className="category-detail-image-arrow" aria-hidden="true">&#8599;</span>}
                </div>
                <Link className="category-detail-card-link" to={subcategoryPath(category.slug, item.title)}>
                  <div className="category-detail-copy">
                    <p className="category-detail-eyebrow">Made for your moment</p>
                    <h2>{item.title}</h2>
                    <span className="category-detail-view-link">View our work <span aria-hidden="true">&#8594;</span></span>
                  </div>
                </Link>
                <div className="category-detail-card-footer">
                  <span>Thoughtfully finished by hand</span>
                  <WhatsAppContactLink className="category-whatsapp-link" message={'Hi, I would like to ask about ' + item.title + ' in ' + category.title + '.'}>
                    Enquire <span aria-hidden="true">&#8599;</span>
                  </WhatsAppContactLink>
                </div>
              </article>
            );
          })}
        </div>
        {category.note && <p className="gifting-category-note category-detail-note">{category.note}</p>}
        <div className="store-page-cta">
          <WhatsAppContactLink className="button" message={'Hi, I would like to plan something from your ' + category.title + ' category.'}>
            Plan this gift on WhatsApp
          </WhatsAppContactLink>
        </div>
      </div>
    </section>
  );
}

