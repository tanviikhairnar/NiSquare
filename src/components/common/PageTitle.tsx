
export interface PageTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export default function PageTitle({ eyebrow, title, subtitle, description }: PageTitleProps) {
  return (
    <header className="store-page-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <p className="store-page-subtitle">{subtitle}</p>}
      {description && <p>{description}</p>}
    </header>
  );
}

