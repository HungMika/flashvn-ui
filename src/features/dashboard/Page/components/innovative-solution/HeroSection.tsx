'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/contexts/i18nContext';

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative bg-blue-50">
      <div className="relative w-full h-[800px]">
        <Image
          src="/images/mil-play-banner.png"
          alt={t('innovative-solution.hero.bannerAlt')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center text-center text-white pb-10">
          <div className="absolute bottom-4 left-4">
            <p className="text-xl text-white font-normal">
              {t('innovative-solution.hero.projectBy')}{' '}
              <span className="font-bold">FLASH VN</span>
            </p>
          </div>
          <div className="absolute bottom-4 right-4">
            <p className="text-xl text-white font-bold">{t('innovative-solution.hero.hashtag')}</p>
          </div>
          <Image
            src="/images/MIL-PLAY-logo.png"
            alt="MIL PLAY"
            width={300}
            height={80}
          />
          <p className="text-2xl font-bold text-[#1D205F] mb-6">
            {t('innovative-solution.hero.tagline')}
          </p>
          <Link
            href="/what-we-do/mil-play"
            className="bg-[#1D205F] text-white font-bold text-2xl py-3 px-6 rounded-full hover:bg-[#FFCF24] hover:text-black transition-colors"
          >
            {t('innovative-solution.hero.cta')}
          </Link>
        </div>
      </div>
      <div className="bg-[#1D205F] text-white py-4 text-center h-[100px] flex items-center justify-center">
        <p className="text-2xl font-bold">
          {t('innovative-solution.hero.bannerText.normal')}{' '}
          <span className="text-black bg-[#FFCF24] font-bold rounded-2xl px-2 py-2">
            {t('innovative-solution.hero.bannerText.highlight')}
          </span>{' '}
          {t('innovative-solution.hero.bannerText.after')}
        </p>
      </div>
    </section>
  );
}
