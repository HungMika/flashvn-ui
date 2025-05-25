import SolutionCard from './SolutionCard';

export default function SolutionsSection() {
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
    <section className="bg-blue-50 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Our solutions</h2>
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
