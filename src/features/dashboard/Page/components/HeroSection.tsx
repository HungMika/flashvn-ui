'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/contexts/i18nContext'; // hook dịch
import '@/features/dashboard/Page/styles/globals.css';

export default function HeroSection() {
  const { t } = useI18n();

  const banners = [
    {
      image: '/images/banner/banner1.jpg',
      alt: t('page.hero.alt1'),
    },
    {
      image: '/images/banner/banner2.jpg',
      alt: t('page.hero.alt2'),
    },
    {
      image: '/images/banner/banner3.jpg',
      alt: t('page.hero.alt3'),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center py-8">
          {/* Left section */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-500">
              {t('page.hero.title.prefix')} <br />
              <span className="text-black bg-[#FFCF24] px-2 rounded-2xl">
                {t('page.hero.title.highlight')}
              </span>{' '}
              {t('page.hero.title.suffix')}
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              {t('page.hero.description')}
            </p>
            <div>
              <Link
                href="/what-we-do"
                className="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 hover:bg-[#FFCF24] hover:text-black transition-colors rounded-full text-lg font-medium"
              >
                {t('page.hero.cta')}
              </Link>
            </div>
          </div>

          {/* Right section */}
          <div className="w-full">
            <div className="relative h-[400px] w-full">
              <Image
                src={banners[currentIndex].image}
                alt={banners[currentIndex].alt}
                fill
                className="object-cover border-2 border-black rounded-lg shadow-lg"
                priority
              />

              {/* Floating icons */}
              <img
                src="/images/icons/icon2.png"
                alt="Floating circle 1"
                className="absolute -top-15 -right-15 w-[150px] h-[150px] rounded-full animate-bounce-move"
              />

              <img
                src="/images/icons/icon4.png"
                alt="Floating circle 2"
                className="absolute -bottom-10 -left-10 w-[70px] h-[70px] rounded-full animate-float-diagonal"
              />
            </div>

            {/* Dots indicator */}
            <div className="mt-4 flex justify-center space-x-2">
              {banners.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-15 bg-gray-400' : 'w-3 bg-gray-400'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
