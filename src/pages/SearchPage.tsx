import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PageTitle from '../components/common/PageTitle';
import { searchCollections } from '../data/storeCatalog';

export interface SearchResultsProps {
  initialQuery: string;
  onQueryChange: (query: string) => void;
}

export function SearchResults({ initialQuery, onQueryChange }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery);
  const results = searchCollections(initialQuery);

  return (
    <section className="store-page">
      <div className="store-page-inner store-page-inner--wide">
        <Breadcrumbs current="Search" />
        <PageTitle
          eyebrow="Find something special"
          title="Search gifting categories"
          description="Search our categories and occasions."
        />
        <form
          className="store-search-form"
          onSubmit={(event) => {
            event.preventDefault();
            onQueryChange(query.trim());
          }}
        >
          <label className="sr-only" htmlFor="store-search-input">Search gifting categories</label>
          <input
            id="store-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search categories or occasions"
          />
          <button className="button" type="submit">Search</button>
        </form>
        {initialQuery && (
          <>
            <p className="store-results-count">{results.length} results for “{initialQuery}”</p>
            {results.length ? (
              <div className="store-collection-grid">
                {results.map((item) => (
                  <Link className="store-collection-card" to={item.href} key={item.href}>
                    <span className="store-collection-image">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="store-collection-card-copy">
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                      <span className="text-link">Explore category</span>
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No categories matched. Try another occasion.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  return <SearchResults key={query} initialQuery={query} onQueryChange={(value) => setParams(value ? { q: value } : {})} />;
}

