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
    answer: 'You can connect with us through WhatsApp or Instagram. Share your occasion, preferences, theme and budget, and our team will help you explore suitable gifting and packaging options.',
  },
  {
    question: 'Which locations and cities do you serve?',
    answer: 'We are based in Nashik, Maharashtra, and cater to gifting requirements across Nashik, Pune, Mumbai and other locations, subject to delivery arrangements.',
  },
  {
    question: 'How much advance booking time is needed?',
    answer: 'Since our creations are planned and prepared to order, we recommend enquiring in advance. The required time depends on the type of order, quantity and customisation involved.',
  },
  {
    question: 'Can I customise the items, colours and packaging style?',
    answer: 'Yes. We can discuss your preferred gift selections, colour combinations, packaging styles and finishing details to suit your occasion and requirements.',
  },
  {
    question: 'Do you create bulk corporate gift hampers and wedding return favours?',
    answer: 'Yes, we welcome enquiries for corporate gifting and wedding return favours. Share your quantity, budget and requirements with us so we can discuss a suitable arrangement.',
  },
];

export default function ServicesPage() {
  return (
    <div className="ni-brand-story-page ni-services-page">
      <section className="store-page services-page-intro !pb-0">
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
