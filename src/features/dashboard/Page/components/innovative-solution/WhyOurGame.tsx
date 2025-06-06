export default function WhyOurGame() {
  const features = [
    {
      icon: '/images/icons/accessibility.png',
      title: 'Accessibility',
      description:
        'Designed for both urban and rural settings, MIL Play ensures equal access through physical and digital formats—making media literacy learning inclusive regardless of internet or resource availability.',
    },
    {
      icon: '/images/icons/scalability.png',
      title: 'Scalability',
      description:
        'With simple rules and adaptable formats, MIL Play easily scales from classrooms to community campaigns and can be localized into different languages and contexts.',
    },
    {
      icon: '/images/icons/inclusivity.png',
      title: 'Inclusivity',
      description:
        'Quick and easy-to-play games invite participation from diverse groups, celebrating differences in gender, culture, and background to foster a truly inclusive learning space.',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <h2 className="text-4xl font-bold text-left text-black">
              <span className="text-black bg-[#FFCF24] px-2 py-2 rounded-2xl">Why</span>
              <br /> our game?
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
