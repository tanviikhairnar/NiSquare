
import React from 'react';
import { newArrivals } from '../../data/products';
import ProductRail from './ProductRail';

export default function NewArrivals() {
  return <ProductRail title="New Arrivals" products={newArrivals} collectionHref="/collections/new-arrivals" className="catalog-section--arrivals" />;
}
