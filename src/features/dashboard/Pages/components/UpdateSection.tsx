import Link from 'next/link';
import Image from 'next/image';

const updates = [
  {
    title: 'Latest program',
    summary:
      '[Workshop] Enhancing Digital competence with the topic of "Applications of AI in scientific research" in HCMC University of Education on Apr 19 2025',
    link: '/what-we-do/capacity-training',
    image: '/images/updates/latest-program.jpg',
    buttonText: 'Read more',
  },
  {
    title: 'Winning Youth Empowerment Fund',
    summary:
      'The representative of FLASH VN proudly secured the funding of Youth Empowerment Fund by European Union and Global Youth Mobilization',
    link: '#',
    image: '/images/updates/youth-empowerment.jpg',
    buttonText: 'Read more',
  },
  {
    title: 'Newsletter',
    summary: 'Every month, the newsletters are regularly updated.',
    link: 'https://drive.google.com/drive/folders/1MOS8_wekEpWQ7ujreZwyzOUGcxFykV2V?usp=sharing',
    image: '/images/updates/newsletter.jpg',
    buttonText: 'Download',
  },
];

export default function UpdateSection() {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-black mb-8">Stay update!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((item, index) => (
              <div
                key={index}
                className="p-4 space-y-4 bg-white"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg border-3 border-black"
                  />
                </div>
                <h3 className="font-semibold text-lg text-black">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.summary}</p>
                <Link
                  href={item.link}
                  className="inline-block border border-gray-900 rounded-full px-6 py-2 text-sm text-black hover:bg-[#FFCF24] transition-colors"
                >
                  {item.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
