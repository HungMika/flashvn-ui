import Image from 'next/image';
import SolutionCard from '@/features/dashboard/Page/components/SolutionCard';

export const metadata = {
  title: 'What We Do - FLASH VN',
  description: 'We are building a future-ready community.',
};

export default function WhatWeDoPage() {
  const solutions = [
    {
      title: 'Capacity training',
      image: '/images/solutions/capacity-training.png',
      alt: 'Capacity training illustration',
      link: '/what-we-do/capacity-training',
    },
    {
      title: 'Innovative solution',
      image: '/images/solutions/innovative-solution.png',
      alt: 'Innovative solution illustration',
      link: '/what-we-do/innovative-solution',
    },
    {
      title: 'Social media content',
      image: '/images/solutions/social-media-content.png',
      alt: 'Social media content illustration',
      link: '/what-we-do/social-media-content',
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-600 leading-tight inline-block">
              Toward a{' '}
              <span className="text-black bg-[#FFCF24] px-2 rounded-2xl inline-block">
                holistic approach
              </span>
            </h1>
            <p className="text-lg text-gray-700 mt-4">
              We are not a traditional training provider. Instead, we are continually<br />
              exploring creative ways to enhance digital and media literacy — <br />
              through social media, grassroots initiatives, and hands-on experiences.
            </p>
          </div>
          <div className="relative h-[300px] w-full">
            <Image
              src="/images/holistic-approach.png"
              alt="Holistic approach illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="bg-blue-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="text-lg text-gray-700">
          <div className="relative mb-6">
            <div className="">
              <Image 
                src="/images/path-to-quote-image.png"
                alt="Opening Quote"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-3xl text-gray-800">
              Our work is a journey of{' '}
              <span className="font-bold">learning, creating, and growing</span> alongside the
              communities we serve.
            </p>
          </div>
          </div>
          <div className="relative h-[200px] w-full md:w-[300px]">
            <Image
              src="/images/team/flexible-model.png"
              alt="Quote illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
