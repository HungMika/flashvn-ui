'use client';

import React from 'react';
import { useI18n } from '@/contexts/i18nContext';

const SolutionsSection = () => {
  const { t } = useI18n();

  const socialMedia = [
    {
      name: t('followUs.facebook'),
      icon: '/images/icons/facebook.png',
      link: 'https://www.facebook.com/duanflashvn',
    },
    {
      name: t('followUs.tiktok'),
      icon: '/images/icons/tiktok.png',
      link: 'https://www.tiktok.com/@flashvn',
    },
    {
      name: t('followUs.youtube'),
      icon: '/images/icons/youtube.png',
      link: 'https://www.youtube.com/@duanflashvn',
    },
  ];

  return (
    <section className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">
          {t('followUs.title')}{' '}
          <span className="text-black bg-[#FFCF24] px-2 py-1 rounded-2xl">
            {t('followUs.highlight')}
          </span>
        </h2>
        <p className="text-gray-700 mb-8">{t('followUs.description')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialMedia.map((media, index) => (
            <a
              key={index}
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={media.icon}
                alt={media.name}
                className="w-16 h-16 mb-4"
              />
              <p className="text-lg font-bold">{media.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
