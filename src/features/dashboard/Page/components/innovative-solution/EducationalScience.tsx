import Image from 'next/image';

export default function EducationalScience() {
  const theories = [
    {
      icon: '/images/icons/play-based-learning.png',
      title: 'Play-Based Learning',
      description: 'Increases engagement and memory retention up to 70% higher, per UNESCO (2023).',
    },
    {
      icon: '/images/icons/zone-of-proximal-development.png',
      title: 'Zone of Proximal Development',
      description: 'Encourages group learning with minimal teacher intervention.',
    },
    {
      icon: '/images/icons/constructivism.png',
      title: 'Constructivism',
      description: 'Learners build knowledge through hands-on practice and reflection.',
    },
    {
      icon: '/images/icons/social-emotional-learning.png',
      title: 'Social-Emotional Learning (SEL)',
      description: 'Promotes empathy, communication, and positive debate.',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-bold text-black py-4">
              <span className="text-black bg-[#FFCF24] px-2 rounded-2xl py-2">Educational science</span> behind MIL Play
            </h2>
            <p className="text-gray-700 mt-4 text-xl">
              MIL Play is built on insights from training over 1,000 teachers and consulting with 30+ educators in both
              rural Mekong Delta areas and Ho Chi Minh City. These learnings shaped a game-based approach that fits
              diverse classroom needs.
            </p>
            <p className="text-gray-700 mt-4 font-bold text-xl">
              MIL Play is grounded in contemporary education theories that align with 21st-century learning:
            </p>
            <Image
              src="/images/education-science-illustration.png"
              alt="Educational Science Illustration"
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
