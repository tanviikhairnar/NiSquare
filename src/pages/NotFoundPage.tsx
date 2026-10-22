import React from 'react';
import { Link } from 'react-router-dom';

export interface NotFoundPageProps {
  title?: string;
}

export default function NotFoundPage({ title = 'Page not found' }: NotFoundPageProps) {
  return (
    <section className="store-page">
      <div className="store-page-inner store-page-inner--narrow store-not-found">
        <p className="eyebrow">404</p>
        <h1>{title}</h1>
        <p>The page you are looking for may have moved.</p>
        <Link className="button" to="/">Return home</Link>
      </div>
    </section>
  );
}

