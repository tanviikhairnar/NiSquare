import Breadcrumbs from '../components/common/Breadcrumbs';
import PageTitle from '../components/common/PageTitle';
import { ServicesSection, OccasionsSection } from '../components/home/NIStorySections';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How do I plan and order a custom hamper with NI² Packaging?',
    answer: 'You can begin by sharing your celebration details, date, and preferences with our founders directly on WhatsApp. We discuss your theme, curate suitable gift options, share design concepts for your approval, and then assemble and finish every detail by hand.',
  },
  {
    question: 'Which locations and cities do you serve?',
    answer: 'Our design studio is based in Nashik, Maharashtra. We regularly create and dispatch bespoke hampers, wedding trousseau trunks, and return favours for clients across Nashik, Pune, Mumbai, and throughout Maharashtra.',
  },
  {
    question: 'How much advance booking time is needed?',
    answer: 'Because every order is custom-made and hand-finished, advance booking is required. We recommend reaching out as early as possible before your event date so we have ample time to source materials, prepare custom packaging, and perfect every detail.',
  },
  {
    question: 'Can I customise the items, colours, and packaging style?',
    answer: 'Yes, full customisation is at the heart of what we do. Our co-founders bring interior and textile design expertise to customize every detail—from color palettes, ribbons, and floral accents to specific goodies, stationery, and keepsake trunks.',
  },
  {
    question: 'Do you create bulk corporate gift hampers and wedding return favours?',
    answer: 'Yes. We design and assemble bulk hampers for wedding return favours, bridesmaid gifts, festive celebrations (Diwali, New Year), and corporate gifting for clients and employee recognition.',
  },
];

export default function ServicesPage() {
  return (
    <div className="ni-brand-story-page">
      <section className="store-page !pb-0">
        <div className="store-page-inner store-page-inner--wide">
          <Breadcrumbs current="Services" />
          <PageTitle
            eyebrow="Bespoke Packaging & Curation"
            title="Our Services"
            description="Discover our handcrafted gifting services—from luxury wedding trousseau packaging and custom hampers to celebration return favours and corporate gifting."
          />
        </div>
      </section>

      <ServicesSection />
      <OccasionsSection />

      <section className="store-page !pt-6 !pb-16" aria-labelledby="services-faq-title">
        <div className="store-page-inner store-page-inner--narrow">
          <header className="ni-section-heading text-center mb-8">
            <p className="ni-section-eyebrow">Everything you need to know</p>
            <h2 className="ni-section-title" id="services-faq-title">Frequently Asked Questions</h2>
            <p>Clear, straightforward answers to help you plan your gifting with confidence.</p>
          </header>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-[#e4ded5] rounded-xl p-5 bg-[#faf8f5] transition-colors open:bg-[#f6f2ec]"
              >
                <summary className="font-semibold text-base text-[#242020] cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>{faq.question}</span>
                  <span className="text-xl text-[#B99A66] transition-transform group-open:rotate-45 shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm text-[#55515A] leading-relaxed m-0 border-t border-[#e8e2d8] pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
