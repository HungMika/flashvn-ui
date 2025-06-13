'use client';

import Image from 'next/image';
import { useI18n } from '@/contexts/i18nContext';

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-black mb-4 whitespace-normal md:whitespace-nowrap">
            {t('capacity-training.hero.title')}{' '}
            <span className="text-black bg-[#FFCF24] px-2 rounded-2xl">
              {t('capacity-training.hero.highlight')}
            </span>
          </h1>
        </div>
        <div className="relative h-[250px] w-full">
          <Image
            src="/images/capacity-training.png"
            alt={t('capacity-training.hero.alt')}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
