
import React from 'react';
import { topPicks } from '../../data/products';
import ProductRail from './ProductRail';

export default function ProductShowcase() {
  return <ProductRail title="Top Picks of the Season" products={topPicks} collectionHref="/collections/bestsellers" className="catalog-section--top-picks" />;
}
