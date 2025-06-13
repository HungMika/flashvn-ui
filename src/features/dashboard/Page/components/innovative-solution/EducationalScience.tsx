'use client';

import Image from 'next/image';
import { useI18n } from '@/contexts/i18nContext';

export default function EducationalScience() {
  const { t } = useI18n();

  const theories = [
    {
      icon: '/images/icons/play-based-learning.png',
      title: t('innovative-solution.edu.theories.playBased.title'),
      description: t('innovative-solution.edu.theories.playBased.desc'),
    },
    {
      icon: '/images/icons/zone-of-proximal-development.png',
      title: t('innovative-solution.edu.theories.zpd.title'),
      description: t('innovative-solution.edu.theories.zpd.desc'),
    },
    {
      icon: '/images/icons/constructivism.png',
      title: t('innovative-solution.edu.theories.constructivism.title'),
      description: t('innovative-solution.edu.theories.constructivism.desc'),
    },
    {
      icon: '/images/icons/social-emotional-learning.png',
      title: t('innovative-solution.edu.theories.sel.title'),
      description: t('innovative-solution.edu.theories.sel.desc'),
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-bold text-black py-4">
              <span className="text-black bg-[#FFCF24] px-2 rounded-2xl py-2">
                {t('innovative-solution.edu.heading.highlight')}
              </span>{' '}
              {t('innovative-solution.edu.heading.normal')}
            </h2>
            <p className="text-gray-700 mt-4 text-xl">{t('innovative-solution.edu.context')}</p>
            <p className="text-gray-700 mt-4 font-bold text-xl">{t('innovative-solution.edu.statement')}</p>
            <Image
              src="/images/education-science-illustration.png"
              alt={t('innovative-solution.edu.imageAlt')}
              width={400}
              height={300}
              className="w-full h-[300px] object-contain"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {theories.map((theory, index) => (
            <div
              key={index}
              className="flex flex-col mb-4 items-start space-x-4 border-gray-300 border-2 rounded-lg p-4 shadow-sm"
            >
              <Image
                src={theory.icon}
                alt={theory.title}
                width={200}
                height={200}
                className="w-[200px] h-[200px] object-contain"
              />
              <div>
                <h3 className="text-lg font-bold text-black">{theory.title}</h3>
                <p className="text-gray-700">{theory.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
