import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PageTitle from '../components/common/PageTitle';
import WhatsAppContactLink from '../components/WhatsAppContactLink';
import { collectionPath, storeCollections, subcategoryPath, subcategorySlug } from '../data/storeCatalog';
import NotFoundPage from './NotFoundPage';

interface BaseGalleryItem {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}

export default function SubcategoryPage() {
  const { handle = '', subcategoryHandle = '' } = useParams<{ handle?: string; subcategoryHandle?: string }>();
  const category = storeCollections.find((item) => item.slug === handle);
  const subcategory = category?.subcategories.find((item) => subcategorySlug(item.title) === subcategoryHandle);
  if (!category || !subcategory) return <NotFoundPage title="Gifting occasion not found" />;

  const images = subcategory.galleryImages?.length ? subcategory.galleryImages : [subcategory.image];
  const videos = subcategory.galleryVideos || [];
  const galleryItems: BaseGalleryItem[] = [
    ...images.map((src) => ({ type: 'image' as const, src })),
    ...videos.map((video) => ({ type: 'video' as const, ...video })),
  ];
  const related = category.subcategories.filter((item) => item.title !== subcategory.title);
  const galleryLayout = galleryItems.length === 1 ? 'single' : galleryItems.length === 2 ? 'two' : 'many';

  return (
    <section className="store-page subcategory-work-page">
      <div className="store-page-inner store-page-inner--wide">
        <Breadcrumbs
          current={subcategory.title}
          paths={[
            { label: 'Gifting categories', href: '/#home-categories' },
            { label: category.title, href: collectionPath(category.slug) },
          ]}
        />
        <PageTitle eyebrow={category.title} title={subcategory.title} description="A closer look at our work for this occasion." />
        <div className={'subcategory-work-gallery subcategory-work-gallery--' + galleryLayout}>
          {galleryItems.map((item, index) => (
            <figure className={'subcategory-work-image' + (item.type === 'video' ? ' subcategory-work-image--video' : '')} key={item.src}>
              {item.type === 'video' ? (
                <video controls playsInline preload="none" poster={item.poster} aria-label={subcategory.title + ' work video'}>
                  <source src={item.src} />
                </video>
              ) : (
                <img src={item.src} alt={subcategory.title + ' gifting and packaging work by NI Square Packaging' + (images.length > 1 ? ', example ' + (index + 1) : '')} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
              )}
            </figure>
          ))}
        </div>
        <div className="subcategory-work-actions">
          <WhatsAppContactLink className="button" message={'Hi, I would like to plan a ' + subcategory.title + ' gift.'}>
            Plan this gift on WhatsApp
          </WhatsAppContactLink>
          <Link className="subcategory-back-link" to={collectionPath(category.slug)}>Back to {category.title}</Link>
        </div>
        {related.length > 0 && (
          <nav className="subcategory-related" aria-label="More occasions in this category">
            <p>More in {category.title}</p>
            <div>
              {related.map((item) => (
                <Link key={item.title} to={subcategoryPath(category.slug, item.title)}>
                  {item.title}<span aria-hidden="true">&#8599;</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </section>
  );
}

