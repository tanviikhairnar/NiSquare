import React, { useState } from 'react';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const email = new FormData(event.currentTarget).get('email');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Subscription could not be saved.');
      setSubmitted(true);
    } catch (requestError) {
      setError(requestError.message || 'The server is unavailable. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-heading">
      <div className="newsletter-copy">
        <p className="eyebrow">A little something for you</p>
        <h2 id="newsletter-heading">Stay in touch with NI Square Packaging</h2>
        <p>Get product news and updates from our team.</p>
      </div>
      {submitted ? (
        <p className="newsletter-success" role="status">Thank you for subscribing to NI Square Packaging updates.</p>
      ) : (
        <form className="newsletter-form" onSubmit={submit}>
          <label className="sr-only" htmlFor="newsletter-email">E-mail</label>
          <input id="newsletter-email" name="email" type="email" placeholder="E-mail" autoComplete="email" required />
          <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : <>Subscribe <span aria-hidden="true">→</span></>}</button>
          {error && <p role="alert">{error}</p>}
        </form>
      )}
    </section>
  );
}