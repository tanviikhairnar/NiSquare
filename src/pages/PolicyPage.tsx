import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PageTitle from '../components/common/PageTitle';

interface PolicyItem {
  label: string;
  detail: string;
}

type PolicyContent = [string, string | PolicyItem[]];

const policies: Record<string, PolicyContent> = {
  'shipping-policy': [
    'Shipping information',
    'Contact us on WhatsApp to discuss delivery options, service areas, timelines, and charges for your hamper.',
  ],
  'refund-policy': [
    'Returns and cancellations',
    'Hampers are planned and prepared to order. Please contact us on WhatsApp before confirming an arrangement so we can discuss its details.',
  ],
  'privacy-policy': [
    'Privacy Policy',
    [
      { label: 'Information We Collect', detail: 'The website enquiry form includes the name you provide, your selected category, event date, and custom requirements. When you choose a founder, these details are passed into a WhatsApp message. Any additional contact or delivery details are shared by you directly in WhatsApp as needed to fulfil an order.' },
      { label: 'How We Use Your Data', detail: 'We use the details you share to discuss and plan custom orders, prepare designs, arrange delivery, and communicate order updates.' },
      { label: 'Direct Communication', detail: 'We use WhatsApp to respond to enquiries and send order confirmations, design proofs, and delivery updates.' },
      { label: 'Payment Security', detail: 'This website does not collect online payment details or process checkout. Payment arrangements are confirmed with you directly for each order.' },
      { label: 'Third-Party Sharing', detail: 'When delivery is part of an order, necessary delivery details are shared with the courier partner handling that package.' },
      { label: 'Photos & Custom Details', detail: 'Personal photos and custom names are used to make your order. We do not publish personal photos or identifying custom details without your permission.' },
      { label: 'Data Safety', detail: 'We take reasonable steps to keep your personal information secure and do not sell, rent, or trade it for marketing.' },
      { label: 'Your Rights', detail: 'Contact us through WhatsApp if you want to review, correct, or delete personal details you have shared with us.' },
    ],
  ],
  'terms-of-service': [
    'Terms & Conditions',
    [
      { label: 'Bulk Orders', detail: 'Please place all bulk and custom orders at least 1 week in advance.' },
      { label: 'Last-Minute Orders', detail: 'Need an urgent order? Message us directly on WhatsApp to check availability!' },
      { label: 'Order Confirmation', detail: 'Orders are confirmed only after a 50% advance payment (or full payment for retail items).' },
      { label: 'Design Approval', detail: 'Once you approve a custom design mockup, no further changes can be made.' },
      { label: 'Handmade Uniqueness', detail: 'Small variations in handmade details, ribbon colors, or textures are natural and expected.' },
      { label: 'Cancellations', detail: 'Advance payments are non-refundable once production or material sourcing has started.' },
      { label: 'Damages & Claims', detail: 'Please record an unboxing video upon delivery so we can assist you in case of any transit damage.' },
      { label: 'Delivery Timelines', detail: 'While we ensure timely dispatch, courier delays due to weather or transit factors are outside our control.' },
      { label: 'Photos & Portfolio', detail: 'We love sharing our work and may feature photos of finished packaging on our website and Instagram!' },
    ],
  ],
};

export default function PolicyPage() {
  const { policy = '' } = useParams<{ policy?: string }>();
  const [title, description] = policies[policy] || ['Store information', 'Contact us on WhatsApp if you need help.'];

  return (
    <section className="store-page">
      <div className="store-page-inner store-page-inner--narrow">
        <Breadcrumbs current={title} />
        <PageTitle eyebrow="Information" title={title} />
        <div className="store-policy-copy">
          {Array.isArray(description) ? (
            <ul>
              {description.map(({ label, detail }) => (
                <li key={label}>
                  <strong>{label}:</strong> {detail}
                </li>
              ))}
            </ul>
          ) : (
            <p>{description}</p>
          )}
          <p>
            For assistance, please <Link to="/pages/contact">contact us</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

