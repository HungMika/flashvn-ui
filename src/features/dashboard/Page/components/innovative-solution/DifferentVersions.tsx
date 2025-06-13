'use client';

import Link from 'next/link';
import { useI18n } from '@/contexts/i18nContext';

export default function DifferentVersions() {
  const { t } = useI18n();

  const versions = [
    {
      title: t('innovative-solution.versions.printed.title'),
      price: t('innovative-solution.versions.printed.price'),
      internet: t('innovative-solution.versions.printed.internet'),
      physicalSet: t('innovative-solution.versions.printed.physicalSet'),
      editable: t('innovative-solution.versions.printed.editable'),
      buttonText: t('innovative-solution.versions.printed.button'),
      buttonLink: '#',
    },
    {
      title: t('innovative-solution.versions.sheets.title'),
      price: t('innovative-solution.versions.sheets.price'),
      internet: t('innovative-solution.versions.sheets.internet'),
      physicalSet: t('innovative-solution.versions.sheets.physicalSet'),
      editable: t('innovative-solution.versions.sheets.editable'),
      buttonText: t('innovative-solution.versions.sheets.button'),
      buttonLink: '#',
    },
    {
      title: t('innovative-solution.versions.web.title'),
      price: t('innovative-solution.versions.web.price'),
      internet: t('innovative-solution.versions.web.internet'),
      physicalSet: t('innovative-solution.versions.web.physicalSet'),
      editable: t('innovative-solution.versions.web.editable'),
      buttonText: t('innovative-solution.versions.web.button'),
      buttonLink: '/what-we-do/mil-play',
    },
  ];

  return (
    <section className="py-12 bg-[#EBFAFF]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-black text-center mb-8 pb-10">
          {t('versions.heading')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:flex flex-col space-y-18 pt-[60px] pr-2 items-center">
            <p className="font-bold text-gray-700 text-right">{t('innovative-solution.versions.labels.price')}</p>
            <p className="font-bold text-gray-700 text-right">{t('innovative-solution.versions.labels.internet')}</p>
            <p className="font-bold text-gray-700 text-right">{t('innovative-solution.versions.labels.physicalSet')}</p>
            <p className="font-bold text-gray-700 text-right">{t('innovative-solution.versions.labels.editable')}</p>
          </div>
          {versions.map((version, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-md pt-10 pb-10 p-6 flex flex-col items-center text-center mb-10"
            >
              <h3 className="absolute -top-6 bg-[#1D205F] text-[#EBFAFF] font-bold text-sl px-4 py-2 rounded-full shadow-md">
                {version.title}
              </h3>

              <ul className="text-gray-700 space-y-6 w-full">
                <li className="text-center">
                  <p className="md:hidden font-bold text-gray-700">{t('innovative-solution.versions.labels.price')}</p>
                  <p>✅<br />{version.price}</p>
                </li>
                <hr className="border-gray-300" />
                <li className="text-center whitespace-pre-line">
                  <p className="md:hidden font-bold text-gray-700">{t('innovative-solution.versions.labels.internet')}</p>
                  <p>{version.internet}</p>
                </li>
                <hr className="border-gray-300" />
                <li className="text-center whitespace-pre-line">
                  <p className="md:hidden font-bold text-gray-700">{t('innovative-solution.versions.labels.physicalSet')}</p>
                  <p>{version.physicalSet}</p>
                </li>
                <hr className="border-gray-300" />
                <li className="text-center whitespace-pre-line">
                  <p className="md:hidden font-bold text-gray-700">{t('innovative-solution.versions.labels.editable')}</p>
                  <p>{version.editable}</p>
                </li>
              </ul>
              <Link
                href={version.buttonLink}
                className="absolute -bottom-5 bg-yellow-400 text-[#1D205F] font-bold py-2 px-6 rounded-full hover:bg-yellow-500 transition-colors shadow-md"
              >
                {version.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
