import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGrid from '../components/store/ProductGrid';
import { formatPrice, getCollectionProducts, storeCollections } from '../data/storeCatalog';

const PAGE_SIZE = 12;
const typeFor = (product) => {
  const name = product.name.toLowerCase();
  if (/children|kids|safari|solar system|adventure|under the sea|panda|dinosaur/.test(name)) return 'Children';
  if (/gift|candle|happiness box/.test(name)) return 'Gifting';
  if (/mug|cup|tea set|teaset/.test(name)) return 'Cups & Mugs';
  if (/bowl|katori/.test(name)) return 'Bowls';
  if (/tray|platter|cutlery/.test(name)) return 'Serveware';
  return 'Tableware';
};

export default function CollectionBrowser() {
  const { handle = '' } = useParams();
  const title = storeCollections.find((item) => item.slug === handle)?.title || handle.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ');
  const all = useMemo(() => getCollectionProducts(handle), [handle]);
  const categories = useMemo(() => [...new Set(all.map(typeFor))].sort(), [all]);
  const [sort, setSort] = useState('featured');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [stock, setStock] = useState(false);
  const [types, setTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => { setSort('featured'); setMin(''); setMax(''); setStock(false); setTypes([]); setPage(1); }, [handle]);
  useEffect(() => {
    if (!open) return undefined;
    const old = document.body.style.overflow;
    const keydown = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.body.style.overflow = 'hidden'; window.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', keydown); };
  }, [open]);

  const products = useMemo(() => {
    let found = all.filter((product) => (!min || product.price >= Number(min)) && (!max || product.price <= Number(max)) && (!stock || product.available !== false) && (!types.length || types.includes(typeFor(product))));
    if (sort === 'price-ascending') found = [...found].sort((a, b) => a.price - b.price);
    if (sort === 'price-descending') found = [...found].sort((a, b) => b.price - a.price);
    if (sort === 'name-ascending') found = [...found].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-descending') found = [...found].sort((a, b) => b.name.localeCompare(a.name));
    return found;
  }, [all, min, max, stock, types, sort]);
  useEffect(() => setPage(1), [handle, min, max, stock, types, sort]);
  const pages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const visible = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const active = (min ? 1 : 0) + (max ? 1 : 0) + (stock ? 1 : 0) + types.length;
  const toggleType = (type) => setTypes((current) => current.includes(type) ? current.filter((item) => item !== type) : [...current, type]);
  const reset = () => { setMin(''); setMax(''); setStock(false); setTypes([]); };

  return <section className="store-page"><div className="store-page-inner store-page-inner--wide">
    <nav className="store-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>{title}</span></nav>
    <header className="store-page-title"><p className="eyebrow">Shop</p><h1>{title}</h1></header>
    <div className="store-listing-toolbar">
      <button type="button" className="store-filter-trigger" onClick={() => setOpen(true)} aria-expanded={open}>☷ Filter{active ? ' (' + active + ')' : ''}</button>
      <span className="store-listing-count">{products.length} {products.length === 1 ? 'product' : 'products'}</span>
      <label className="store-sort-control">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
        <option value="featured">Featured</option><option value="best-selling">Best selling</option><option value="name-ascending">Alphabetically, A-Z</option><option value="name-descending">Alphabetically, Z-A</option><option value="price-ascending">Price, low to high</option><option value="price-descending">Price, high to low</option>
      </select></label>
    </div>
    {!!active && <div className="store-active-filters">
      {min && <button type="button" onClick={() => setMin('')}>Min. Rs. {min} ×</button>}{max && <button type="button" onClick={() => setMax('')}>Max. Rs. {max} ×</button>}
      {stock && <button type="button" onClick={() => setStock(false)}>In stock ×</button>}{types.map((type) => <button type="button" key={type} onClick={() => toggleType(type)}>{type} ×</button>)}
      <button type="button" className="store-clear-filters" onClick={reset}>Clear all</button>
    </div>}
    <ProductGrid products={visible} emptyMessage="No products match these filters. Change your selection or clear all filters." />
    {pages > 1 && <nav className="store-pagination" aria-label="Collection pages">
      <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => setPage((n) => n - 1)}>‹</button>
      {Array.from({ length: pages }, (_, index) => index + 1).map((n) => <button type="button" key={n} className={page === n ? 'is-active' : ''} aria-current={page === n ? 'page' : undefined} onClick={() => setPage(n)}>{n}</button>)}
      <button type="button" aria-label="Next page" disabled={page === pages} onClick={() => setPage((n) => n + 1)}>›</button>
    </nav>}
  </div>
  <button type="button" className={'store-filter-backdrop ' + (open ? 'is-open' : '')} onClick={() => setOpen(false)} aria-label="Close filters" tabIndex={open ? 0 : -1} />
  <aside className={'store-filter-drawer ' + (open ? 'is-open' : '')} role="dialog" aria-modal="true" aria-label="Filter products" aria-hidden={!open}>
    <header><h2>Filters</h2><button type="button" onClick={() => setOpen(false)} aria-label="Close filters">×</button></header>
    <div className="store-filter-content">
      <details open><summary>Availability</summary><label className="store-filter-check"><input type="checkbox" checked={stock} onChange={(event) => setStock(event.target.checked)} />In stock only</label></details>
      <details open><summary>Price</summary><p>Highest price: {formatPrice(Math.max(0, ...all.map((item) => item.price)))}</p><div className="store-filter-price-fields">
        <label><span>Rs.</span><input type="number" min="0" aria-label="Minimum price" placeholder="From" value={min} onChange={(event) => setMin(event.target.value)} /></label>
        <label><span>Rs.</span><input type="number" min="0" aria-label="Maximum price" placeholder="To" value={max} onChange={(event) => setMax(event.target.value)} /></label>
      </div></details>
      {categories.length > 0 && <details open><summary>Category</summary>{categories.map((type) => <label className="store-filter-check" key={type}><input type="checkbox" checked={types.includes(type)} onChange={() => toggleType(type)} />{type}</label>)}</details>}
    </div>
    <footer><button type="button" className="text-link" onClick={reset}>Clear all</button><button type="button" className="button" onClick={() => setOpen(false)}>View {products.length} results</button></footer>
  </aside>
</section>;
}