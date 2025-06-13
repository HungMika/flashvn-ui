'use client';

import Image from 'next/image';
import parse from 'html-react-parser';
import { useI18n } from '@/contexts/i18nContext';

export default function TeamSection() {
  const { t } = useI18n();

  const coreTeam = [
    {
      name: 'Khang LÊ',
      role: 'Founder/ Project Lead',
      description: 'Google for Edu Certified Trainer\nYSEALI Professional Fellows',
      image: '/images/team/khang.jpg',
    },
    {
      name: 'Kiệt CHANG',
      role: 'Operation Manager',
      description:
        'Coordinator of Vietnam School of Development\nOperation Lead - Books in the City\nYSEALI Professional Fellows',
      image: '/images/team/kiet.jpg',
    },
  ];

  const technicalTeam = [
    'Bùi Thị Tuyết Ngọc',
    'Đoàn Văn Nhân',
    'Võ Nguyễn Đình Quân',
    'Đặng Quốc Hưng',
    'Trần Nguyễn Khang',
  ];

  const marcomTeam = ['Tuấn Anh Cao', 'Bảo Nguyên', 'Tài Nguyễn', 'Châu Trương', 'Vy Lê'];

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
          {t('about-us.teamSection.title')}
        </h2>
        <p className="text-gray-700 mb-8 text-sm sm:text-base">
          {t('about-us.teamSection.intro')}
        </p>

        <div className="grid gap-8">
          {coreTeam.map((member, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4"
            >
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-lg border-2 border-black"
                />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-lg font-bold text-black">{member.name}</h4>
                <p className="inline-block border border-black rounded-full px-4 py-1 text-black font-bold my-1 text-sm">
                  {member.role}
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flexible Model Section */}
      <div className="bg-blue-50 mt-10 py-6">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <p className="text-base text-gray-700">
              {parse(t('about-us.teamSection.flexibleModelText'))}
            </p>
            <div className="w-full flex justify-center md:justify-end">
              <Image
                src="/images/team/flexible-model.png"
                alt={t('about-us.teamSection.flexibleModelAlt')}
                width={300}
                height={200}
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tech + Marcom Team */}
      <div className="container mx-auto px-4 mt-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-bold text-black mb-2">
              {t('about-us.teamSection.technicalTeam')}
            </h4>
            <ul className="text-gray-700 space-y-1 text-sm sm:text-base">
              {technicalTeam.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-black mb-2">
              {t('about-us.teamSection.marcomTeam')}
            </h4>
            <ul className="text-gray-700 space-y-1 text-sm sm:text-base">
              {marcomTeam.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
