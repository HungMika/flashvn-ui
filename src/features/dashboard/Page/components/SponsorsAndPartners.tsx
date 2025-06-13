'use client';

import Image from 'next/image';
import { useI18n } from '@/contexts/i18nContext';

export default function SponsorsAndPartners() {
  const { t } = useI18n();

  return (
    <section className="relative bg-white py-10 overflow-hidden">
      {/* Icon ở góc trên bên phải */}
      <Image
        src="/images/icons/icon1.png"
        alt="Decorative Icon"
        width={200}
        height={200}
        className="absolute -top-15 -right-15 z-10 animate-bounce-move"
      />

      <div className="container mx-auto px-4 space-y-16">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            {t('page.sponsorsAndPartners.sponsorsTitle')}
          </h3>
          <div className="flex items-center justify-center">
            <img
              src="images/all-logos-image.png"
              alt={t('page.sponsorsAndPartners.sponsorsAlt')}
              className="w-full max-w-[800px] object-contain"
            />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            {t('page.sponsorsAndPartners.partnersTitle')}
          </h3>
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full max-w-[600px] mb-4">
              <img
                src="images/all-partners-image.png"
                alt={t('page.sponsorsAndPartners.partnersAlt')}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
