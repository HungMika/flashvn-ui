'use client';

import Image from 'next/image';
import { useI18n } from '@/contexts/i18nContext';

export default function ImpactSection() {
  const { t } = useI18n();

  const impactStats = [
    {
      value: '2,300',
      label: t('page.impact.beneficiaries'),
    },
    {
      value: '32',
      label: t('page.impact.programs'),
    },
    {
      value: '13K+',
      label: t('page.impact.followers'),
    },
  ];

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12 relative">
        {/* Left content */}
        <div className="flex-1 relative">
          <div className="w-16 h-16 ml-24 animate-float-diagonal">
            <Image
              src="/images/icons/icon2.png"
              alt="Top Icon"
              width={64}
              height={64}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {t('page.impact.title')}
          </h2>

          {impactStats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="text-5xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Map with markers */}
        <div className="relative w-full max-w-3xl mx-auto">
          <Image
            src="/images/asean-map.png"
            alt="ASEAN Map"
            width={800}
            height={500}
            className="w-full h-auto"
            priority
          />

          <Image
            src="/images/icons/icon3.png"
            alt="Marker Vietnam"
            width={50}
            height={50}
            className="absolute top-[40%] left-[30%] animate-float-diagonal"
          />
          <Image
            src="/images/icons/icon3.png"
            alt="Marker Malaysia"
            width={24}
            height={24}
            className="absolute top-[85%] left-[30%] animate-float-diagonal"
          />
          <Image
            src="/images/icons/icon3.png"
            alt="Marker Philippines"
            width={24}
            height={24}
            className="absolute top-[34%] left-[49%] animate-float-diagonal"
          />
        </div>
      </div>
    </section>
  );
}
