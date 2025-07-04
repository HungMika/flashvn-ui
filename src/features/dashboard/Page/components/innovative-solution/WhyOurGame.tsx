'use client';

import { useI18n } from '@/contexts/i18nContext';

export default function WhyOurGame() {
  const { t } = useI18n();

  const features = [
    {
      icon: '/images/icons/accessibility.png',
      title: t('innovative-solution.why.accessibility.title'),
      description: t('innovative-solution.why.accessibility.description'),
    },
    {
      icon: '/images/icons/scalability.png',
      title: t('innovative-solution.why.scalability.title'),
      description: t('innovative-solution.why.scalability.description'),
    },
    {
      icon: '/images/icons/inclusivity.png',
      title: t('innovative-solution.why.inclusivity.title'),
      description: t('innovative-solution.why.inclusivity.description'),
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <h2 className="text-4xl font-bold text-left text-black">
              <span className="text-black bg-[#FFCF24] px-2 py-2 rounded-2xl">{t('innovative-solution.why.heading.highlight')}</span>
              <br /> {t('innovative-solution.why.heading.normal')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <img src={feature.icon} alt={feature.title} className="w-[120px] h-[120px] object-contain" />
                <div>
                  <h3 className="text-xl font-bold text-[#1D205F] mb-2">{feature.title}</h3>
                  <p className="text-[#1D205F]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
