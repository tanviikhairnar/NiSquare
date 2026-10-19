import WhatsAppContactLink from '../WhatsAppContactLink';

export default function ServiceAreaSection() {
  return (
    <section className="ni-home-section ni-occasions ni-seo-service-area" id="service-areas">
      <div className="ni-section-inner ni-occasions-layout">
        <div>
          <p className="ni-section-eyebrow">Thoughtful gifting, across Maharashtra</p>
          <h2 className="ni-section-title">Wedding and corporate hampers in Nashik, Pune and Mumbai</h2>
        </div>
        <div className="ni-occasions-copy">
          <h3>Wedding hampers shaped around your traditions</h3>
          <p>From trousseau gifts and welcome hampers to wedding favours and ring ceremony platters, we plan each detail around your celebration. We work with families planning Jain, Marwari and Sindhi weddings, tailoring colours, packaging and personal touches to the occasion.</p>
          <h3>Corporate hampers for teams, clients and office events</h3>
          <p>Plan custom gifts for employee milestones, client appreciation, festive occasions and company events. NI Square Packaging is based in Nashik District and works with families and businesses in Nashik, Pune and Mumbai. Message our founders to discuss your occasion, quantity and delivery plans.</p>
          <WhatsAppContactLink className="button" message="Hi, I would like to discuss wedding or corporate hampers in Nashik, Pune or Mumbai.">Discuss a custom order</WhatsAppContactLink>
        </div>
      </div>
    </section>
  );
}