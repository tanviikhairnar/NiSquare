import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbPath {
  href: string;
  label: string;
}

export interface BreadcrumbsProps {
  current: string;
  paths?: BreadcrumbPath[];
}

export default function Breadcrumbs({ current, paths = [] }: BreadcrumbsProps) {
  return (
    <nav className="store-breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span>/</span>
      {paths.map((p) => (
        <React.Fragment key={p.href}>
          <Link to={p.href}>{p.label}</Link>
          <span>/</span>
        </React.Fragment>
      ))}
      <span>{current}</span>
    </nav>
  );
}

