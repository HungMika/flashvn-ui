'use client';

import Image from 'next/image';
import SolutionCard from '@/features/dashboard/Page/components/SolutionCard';
import { useI18n } from '@/contexts/i18nContext';

export default function ClientComponent() {
  const { t } = useI18n();

  const rawSolutions = t('whatWeDo.solutions');
  const solutions = Array.isArray(rawSolutions)
    ? (rawSolutions as { title: string; image: string; alt: string; link: string }[])
    : [];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-600 leading-tight">
              {t('whatWeDo.hero.titleStart')}{' '}
              <span className="text-black bg-[#FFCF24] px-2 rounded-2xl inline-block">
                {t('whatWeDo.hero.highlight')}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700">
              {t('whatWeDo.hero.description.line1')}
              <br />
              {t('whatWeDo.hero.description.line2')}
              <br />
              {t('whatWeDo.hero.description.line3')}
            </p>
          </div>
          <div className="relative h-[250px] sm:h-[300px] w-full">
            <Image
              src="/images/holistic-approach.png"
              alt={t('whatWeDo.hero.imageAlt')}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 place-items-center sm:place-items-stretch">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              title={solution.title}
              image={solution.image}
              alt={solution.alt}
              link={solution.link}
            />
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-blue-50 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex-1 space-y-6">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/path-to-quote-image.png"
                alt="Quote icon"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-800">
              {t('whatWeDo.quote.part1')} <span className="font-bold">{t('whatWeDo.quote.highlight')}</span>{' '}
              {t('whatWeDo.quote.part2')}
            </p>
          </div>
          <div className="relative h-[200px] w-full max-w-[300px]">
            <Image
              src="/images/team/flexible-model.png"
              alt={t('whatWeDo.quote.imageAlt')}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
