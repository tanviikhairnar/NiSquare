
const testimonialImages: string[] = [
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
  '/assets/images/optimized/catalog/IMG_4544.webp',
];

interface Testimonial {
  category: string;
  quote: string;
  name: string;
  role: string;
  initial: string;
}

const testimonials: Testimonial[] = [
  {
    category: 'Wedding Trousseau',
    quote: 'The trousseau was amazing. Everyone loved it!',
    name: 'Sakshi Bhandari',
    role: 'Customer',
    initial: 'S',
  },
  {
    category: 'Custom Packaging',
    quote: 'This is too good.',
    name: 'Deven Munot',
    role: 'Customer',
    initial: 'D',
  },
  {
    category: 'Personal Gifting',
    quote: 'I received the parcel and loved it. It exceeded my expectations. Thank you so much.',
    name: 'Customer',
    role: 'Customer feedback',
    initial: 'C',
  },
  {
    category: 'Personal Gifting',
    quote: 'My sister loved it. I really appreciate the effort and coordination from your side. We all loved it.',
    name: 'Customer',
    role: 'Customer feedback',
    initial: 'C',
  },
  {
    category: 'Custom Hampers',
    quote: 'My friend was very happy. The finish of every detail was perfect, and it was more beautiful than we expected.',
    name: 'Customer',
    role: 'Customer feedback',
    initial: 'C',
  },
  {
    category: 'Gift Packaging',
    quote: 'I got my order, just as shown. I am really happy with the product; it is beautiful.',
    name: 'Customer',
    role: 'Customer feedback',
    initial: 'C',
  },
];

function PhotoCollage({ images, side }: { images: string[]; side: 'left' | 'right' }) {
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
  // Duplicate list to achieve a seamless, infinite auto-scrolling loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="ni-testimonials" aria-labelledby="ni-testimonials-title">
      <div className="ni-decoration-layer" aria-hidden="true">
        <img
          src="/assets/decorations/bird-flying.webp"
          alt=""
          className="ni-motif testimonials-motif-bird"
          loading="lazy"
          decoding="async"
        />
      </div>
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

        <div className="ni-testimonial-carousel" aria-label="Customer reviews carousel">
          <div className="ni-testimonial-track" role="region" aria-label="Customer reviews marquee">
            {marqueeItems.map((testimonial, index) => (
              <article
                className="ni-testimonial-card"
                key={testimonial.name + '-' + index}
                aria-label={'Testimonial from ' + testimonial.name}
              >
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
      </div>
    </section>
  );
}

