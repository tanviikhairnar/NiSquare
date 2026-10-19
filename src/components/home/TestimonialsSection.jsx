import React from 'react';

const testimonialImages = [
  '/assets/images/optimized/catalog/IMG_1167.webp',
  '/assets/images/optimized/catalog/IMG_2897-3.webp',
  '/assets/images/optimized/catalog/IMG_0035.webp',
  '/assets/images/optimized/catalog/IMG_1169.webp',
  '/assets/images/optimized/catalog/IMG_4525.webp',
  '/assets/images/optimized/catalog/IMG_4846.webp',
  '/assets/images/optimized/catalog/IMG_1151.webp',
  '/assets/images/optimized/catalog/IMG_3596.webp',
  '/assets/images/optimized/catalog/IMG_4949.webp',
  '/assets/images/optimized/catalog/chocolate-khoncha-table.webp',
];

const testimonials = [
  {
    category: 'Wedding Gifting',
    quote: 'Customer feedback pending approval.',
    name: 'Customer name pending',
    role: 'Wedding gifting customer',
    initial: '?',
    placeholder: true,
  },
  {
    category: 'Return Favours',
    quote: 'Customer feedback pending approval.',
    name: 'Customer name pending',
    role: 'Return favours customer',
    initial: '?',
    placeholder: true,
  },
  {
    category: 'Corporate Gifting',
    quote: 'Customer feedback pending approval.',
    name: 'Customer name pending',
    role: 'Corporate gifting customer',
    initial: '?',
    placeholder: true,
  },
];

function PhotoCollage({ images, side }) {
  return (
    <div className={'testimonial-gallery testimonial-gallery--' + side} aria-hidden="true">
      {images.map((image) => (
        <div className="testimonial-gallery-image" key={image}>
          <img src={image} alt="" loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="ni-testimonials" aria-labelledby="ni-testimonials-title">
      <div className="ni-testimonials-inner">
        <div className="ni-testimonials-hero">
          <PhotoCollage images={testimonialImages.slice(0, 5)} side="left" />
          <div className="ni-testimonials-intro">
            <span className="ni-testimonials-pill">Testimonials</span>
            <h2 id="ni-testimonials-title">Trusted for life’s most meaningful moments</h2>
            <p>Thoughtful gifting for celebrations, milestones, and teams.</p>
          </div>
          <PhotoCollage images={testimonialImages.slice(5)} side="right" />
        </div>

        <div className="ni-testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="ni-testimonial-card" key={testimonial.category}>
              <span className="ni-testimonial-tag">{testimonial.category}</span>
              {testimonial.placeholder && <span className="ni-testimonial-tag ni-testimonial-tag--placeholder">Placeholder</span>}
              <blockquote>“{testimonial.quote}”</blockquote>
              <div className="ni-testimonial-reviewer">
                <span className="ni-testimonial-avatar" aria-hidden="true">{testimonial.initial}</span>
                <span className="ni-testimonial-reviewer-copy">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
