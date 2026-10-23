import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import PageTitle from '../components/common/PageTitle';
import WhatsAppContactLink from '../components/WhatsAppContactLink';
import { SolidWhatsAppIcon, SolidInstagramIcon } from '../components/common/Icons';
import { WHATSAPP_FOUNDERS } from '../lib/whatsapp';

const INSTAGRAM_DM_URL =
  'https://www.instagram.com/direct/t/17849218443058988/';

const contactButtonClass =
  'button w-full !justify-start !gap-3 !px-6 !py-3.5 !min-h-[3.1rem] !text-[0.82rem] !tracking-[0.08em] !font-semibold !rounded-full';

export default function ContactPage() {
  return (
    <section className="store-page">
      <div className="store-page-inner store-page-inner--narrow">
        <Breadcrumbs current="Contact" />
        <PageTitle
          eyebrow="We are here to help"
          title="Chat with our founders"
          description="Questions about a product, gift, or order? Share a few details and message us on WhatsApp or Instagram."
        />

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start gap-8 md:gap-14 mt-8 sm:mt-12">
          <div className="flex flex-col items-start justify-start">
            <h2 className="text-xl sm:text-2xl font-bold text-[#242020] mb-3 leading-tight tracking-tight">
              Plan something personal
            </h2>
            <p className="text-sm sm:text-base text-[#55515A] leading-relaxed max-w-[26rem] m-0">
              Tell us about your occasion, then choose a founder to continue on WhatsApp or connect with us on Instagram.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 w-full max-w-[23rem]">
            {WHATSAPP_FOUNDERS.map((founder) => (
              <WhatsAppContactLink
                className={contactButtonClass}
                key={founder.phone}
                message="Hi, I would like to plan a hamper."
                founderPhone={founder.phone}
              >
                <SolidWhatsAppIcon width="1.25em" height="1.25em" className="text-lg shrink-0 text-[#B99A66]" />
                <span>Message {founder.name}</span>
              </WhatsAppContactLink>
            ))}

            <a
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={contactButtonClass}
            >
              <SolidInstagramIcon width="1.25em" height="1.25em" className="text-lg shrink-0 text-[#B99A66]" />
              <span>DM on Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
