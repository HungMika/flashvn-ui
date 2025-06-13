'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/contexts/i18nContext';

interface JourneyStep {
  year: string;
  title: string;
  content: string;
  icon: string;
  illustration1: string;
  illustration2?: string;
}

export default function JourneySection() {
  const { t } = useI18n();
  const rawSteps = t('about-us.jn.journey') as unknown;
const journeySteps = Array.isArray(rawSteps) ? (rawSteps as JourneyStep[]) : [];

  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);

  const toggleStep = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const calculateLineHeight = () => {
      if (containerRef.current) {
        const markers = containerRef.current.querySelectorAll('.step-marker');
        const markersArray = Array.from(markers) as HTMLElement[];

        if (markersArray.length > 0) {
          const top = markersArray[0].offsetTop + markersArray[0].offsetHeight / 2;
          const bottom = markersArray[markersArray.length - 1].offsetTop + markersArray[markersArray.length - 1].offsetHeight / 2;
          if (top !== bottom) setLineHeight(bottom - top);
        }
      }
    };

    setTimeout(() => calculateLineHeight(), 100);
    window.addEventListener('resize', calculateLineHeight);
    return () => window.removeEventListener('resize', calculateLineHeight);
  }, [expandedIndices]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center relative">
        {t('about-us.jn.journeyTitle')}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#FFCF24] rounded-full"></span>
      </h2>

      <div className="relative" ref={containerRef}>
        {lineHeight > 0 && (
          <div
            className="absolute left-8 md:left-10 w-1 bg-gradient-to-b from-[#FFCF24] to-[#3B82F6] z-0 rounded-full"
            style={{ top: '24px', height: `${lineHeight}px` }}
          />
        )}

        <div className="space-y-12 relative z-10">
          {journeySteps.map((step, index) => {
            const isExpanded = expandedIndices.includes(index);
            const isLast = index === journeySteps.length - 1;

            return (
              <div key={index} className="relative z-10 group">
                <button
                  onClick={() => toggleStep(index)}
                  className="flex items-start md:items-center space-x-6 w-full text-left p-6 rounded-xl transition-all duration-300 hover:bg-gray-50/80 backdrop-blur-sm"
                >
                  <div className="step-marker flex-shrink-0 relative bg-white border-2 border-gray-200 group-hover:border-[#FFCF24] rounded-full w-16 h-16 flex items-center justify-center shadow-sm transition-all duration-300">
                    <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">{step.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{step.title}</h3>
                    <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className={`mt-2 ml-24 pl-2 ${isLast ? 'ml-24 pl-0' : ''} animate-fadeIn`}>
                    <div className={`${isLast ? 'bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl shadow-sm' : ''}`}>
                      {isLast ? (
                        <div className="flex flex-col gap-8">
                          <p className="text-gray-700 whitespace-pre-line max-w-4xl text-lg leading-relaxed">
                            {step.content}
                          </p>
                          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                            <Image src={step.illustration1} alt={`${step.title} illustration`} fill className="object-cover rounded-xl transition-all duration-500 hover:scale-105" priority />
                          </div>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-8 items-stretch">
                          <div className="flex flex-col justify-between">
                            <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed">
                              {step.content}
                            </p>
                          </div>
                          <div className="flex flex-col gap-6 justify-between h-full">
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                              <Image src={step.illustration1} alt={`${step.title} illustration 1`} fill className="object-cover transition-all duration-500 hover:scale-105" />
                            </div>
                            {step.illustration2 && (
                              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                                <Image src={step.illustration2} alt={`${step.title} illustration 2`} fill className="object-cover transition-all duration-500 hover:scale-105" />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
