'use client';

import { useI18n } from '@/contexts/i18nContext';
import SolutionCard from './SolutionCard';

export default function SolutionsSection() {
  const { t } = useI18n();

  const solutions = [
    {
      title: t('page.solutions.capacityTraining.title'),
      image: '/images/solutions/capacity-training.png',
      alt: t('page.solutions.capacityTraining.alt'),
      link: '/what-we-do/capacity-training',
    },
    {
      title: t('page.solutions.innovativeSolution.title'),
      image: '/images/solutions/innovative-solution.png',
      alt: t('page.solutions.innovativeSolution.alt'),
      link: '/what-we-do/innovative-solution',
    },
    {
      title: t('page.solutions.socialMediaContent.title'),
      image: '/images/solutions/social-media-content.png',
      alt: t('page.solutions.socialMediaContent.alt'),
      link: '/what-we-do/social-media-content',
    },
  ];

  return (
    <section className="bg-blue-50 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('page.solutions.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
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
      </div>
    </section>
  );
}
