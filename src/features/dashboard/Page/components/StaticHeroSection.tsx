'use client';
import Image from 'next/image';
import { useI18n } from '@/contexts/i18nContext';

export default function StaticHeroSection() {
  const { t } = useI18n();

  return (
    <div className="relative w-full bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center py-10">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
              {t('about-us.staticHero.titleStart')}{' '}
              <span className="text-black bg-[#FFCF24] px-2 rounded-2xl">
                {t('about-us.staticHero.titleHighlight')}
              </span>
            </h1>
            <p className="text-lg text-gray-700">
              {t('about-us.staticHero.description')}
            </p>
          </div>
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/banner/banner1.jpg"
              alt={t('about-us.staticHero.imageAlt')}
              fill
              className="object-cover rounded-lg border-2 border-black"
              priority
            />
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
