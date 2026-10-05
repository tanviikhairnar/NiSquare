import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function ProductGallery({ product }) {
  const images = useMemo(() => [...new Set((product.images || [product.image, product.secondaryImage]).filter(Boolean))], [product]);
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const touchStart = useRef(null);

  useEffect(() => { setActive(0); setZoomOpen(false); }, [product.id]);
  useEffect(() => {
    if (!zoomOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setZoomOpen(false);
      if (event.key === 'ArrowRight') setActive((value) => (value + 1) % images.length);
      if (event.key === 'ArrowLeft') setActive((value) => (value + images.length - 1) % images.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); };
  }, [zoomOpen, images.length]);
  const move = (direction) => setActive((value) => (value + direction + images.length) % images.length);

  return <>
    <div className="store-product-gallery">
      <div className="store-product-thumbnails" role="group" aria-label="Choose product image">
        {images.map((image, index) => <button type="button" className={active === index ? 'is-active' : ''} key={image} onClick={() => setActive(index)} aria-label={'Show image ' + (index + 1)} aria-pressed={active === index}><img src={image} alt="" loading="lazy" /></button>)}
      </div>
      <div className="store-product-main-wrap" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
        touchStart.current = null;
      }}>
        <button type="button" className="store-product-main-image-button" onClick={() => setZoomOpen(true)} aria-label={'Zoom image ' + (active + 1) + ' of ' + images.length}>
          <img key={images[active]} className="store-product-main-image" src={images[active]} alt={product.name} fetchPriority="high" />
          <span className="store-product-zoom-hint" aria-hidden="true">+</span>
        </button>
        {images.length > 1 && <>
          <button type="button" className="store-gallery-arrow store-gallery-arrow--previous" onClick={() => move(-1)} aria-label="Previous image">&#8249;</button>
          <button type="button" className="store-gallery-arrow store-gallery-arrow--next" onClick={() => move(1)} aria-label="Next image">&#8250;</button>
        </>}
        <span className="store-gallery-count">{active + 1} / {images.length}</span>
      </div>
    </div>
    {zoomOpen && <div className="store-gallery-lightbox" role="dialog" aria-modal="true" aria-label="Product image viewer" onClick={() => setZoomOpen(false)}>
      <button type="button" className="store-gallery-close" onClick={() => setZoomOpen(false)} aria-label="Close image viewer">&#215;</button>
      {images.length > 1 && <button type="button" className="store-gallery-lightbox-arrow store-gallery-lightbox-arrow--previous" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Previous image">&#8249;</button>}
      <button type="button" className="store-gallery-lightbox-image" onClick={(event) => event.stopPropagation()} aria-label="Product image"><img src={images[active]} alt={product.name} /></button>
      {images.length > 1 && <button type="button" className="store-gallery-lightbox-arrow store-gallery-lightbox-arrow--next" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Next image">&#8250;</button>}
      <span className="store-gallery-lightbox-count">{active + 1} / {images.length}</span>
    </div>}
  </>;
}