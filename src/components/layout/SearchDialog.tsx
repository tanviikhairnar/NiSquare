import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchCollections } from '../../data/storeCatalog';

export interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement | null>(null);
  const dialog = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);
  const navigate = useNavigate();
  const matches = searchCollections(query).slice(0, 5);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    const returnFocus = document.activeElement as HTMLElement | null;
    const focusInputFrame = window.requestAnimationFrame(() => input.current?.focus());
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(dialog.current?.querySelectorAll<HTMLElement>('input:not([disabled]), button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])') ?? [])
        .filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        dialog.current?.focus();
      } else if (event.shiftKey && (document.activeElement === first || !dialog.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.current?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', keydown);
    return () => {
      window.cancelAnimationFrame(focusInputFrame);
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', keydown);
      if (returnFocus?.isConnected) returnFocus.focus?.();
    };
  }, [isOpen]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    onClose();
    navigate(value ? '/search?q=' + encodeURIComponent(value) : '/search');
  };

  if (!isOpen) return null;

  return (
    <div
      className="store-search-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialog}
        className="store-search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Search gifting categories"
        tabIndex={-1}
      >
        <div className="store-search-dialog-header">
          <form className="store-search-dialog-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="header-search-input">Search gifting categories</label>
            <input
              ref={input}
              id="header-search-input"
              type="search"
              placeholder="Search categories or occasions"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" aria-label="Submit search">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7.5" />
                <path d="m17 17 5 5" />
              </svg>
            </button>
          </form>
          <button type="button" className="store-search-close" onClick={onClose} aria-label="Close search">×</button>
        </div>
        {query.trim() && (
          <div className="store-search-suggestions" aria-live="polite">
            <p>{matches.length ? 'Categories & occasions' : 'No matching categories'}</p>
            {matches.map((item) => (
              <Link to={item.href} key={item.href} onClick={onClose}>
                <img src={item.image} alt="" loading="lazy" decoding="async" />
                <span>{item.title}</span>
                <span>{item.description}</span>
              </Link>
            ))}
            {matches.length > 0 && (
              <button type="button" className="text-link" onClick={submit}>View all results</button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

