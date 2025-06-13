// src/app/(page)/contact-us/ContactUsClient.tsx
'use client';

import Section from '@/features/dashboard/Page/components/Section';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/contexts/i18nContext';

export default function ContactUsClient() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Section title="" className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-600 mb-4">
                  <span className="text-black bg-[#FFCF24] px-2 py-2 rounded-2xl">{t('contact.orgName')}</span>{' '}
                  {t('contact.orgType')}
                </h2>
                <p className="text-gray-700">
                  {t('contact.registration')} <br />
                  {t('contact.address')} <br />
                  {t('contact.email')} <br />
                  {t('contact.phone')}
                </p>
              </div>
              <Link
                href="/what-we-do"
                className="inline-block border border-black font-bold rounded-full px-4 py-2 text-sm text-black hover:bg-[#FFCF24] hover:border-2 transition-colors"
              >
                {t('contact.linkText')}
              </Link>
            </div>
            <div className="relative h-[300px] w-full">
              <Image
                src="/images/holistic-approach.png"
                alt="Holistic approach illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </Section>

        <Section title="" className="py-8 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-black mb-4">{t('contact.supportTitle')}</h2>
            <p className="text-gray-700 mb-6">{t('contact.para1')}</p>
            <p className="text-gray-700 mb-6">{t('contact.para2')}</p>

            <h3 className="text-lg font-bold text-black mb-4">{t('contact.donationTitle')}</h3>
            <ul className="text-gray-700 space-y-2">
              <li>{t('contact.recipient')}</li>
              <li>{t('contact.bank')}</li>
              <li>{t('contact.account')}</li>
              <li>{t('contact.note')}</li>
            </ul>
            <p className="text-gray-700 mt-4">{t('contact.footer')}</p>
          </div>
        </Section>

        <div className="w-full h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d358.4888780044865!2d106.64665788561821!3d10.800763133282114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752948c52f0343%3A0x8d264868419183a!2zMTAyQSBMw6ogVHJ1bmcgTmdoxKlhLCBQaMaw4budbmcgMTIsIFTDom4gQsOsbmgsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2sus!4v1745797939844!5m2!1svi!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
