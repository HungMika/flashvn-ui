'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface JourneyStep {
  year: string;
  title: string;
  content: string;
  icon: string;
  illustration1: string;
  illustration2?: string; // optional for flexibility
}

const journeySteps: JourneyStep[] = [
  {
    year: '2021',
    title: 'The First Spark',
    content:
      'FLASH VN, then known as the FLASH initiative, was born from a small but heartfelt idea at the YSEALI Summit\'s Project Pitch competition. The concept was simple yet deeply meaningful: to empower Vietnamese youth through digital literacy. Concerned about by the pandemic, winning 3rd place and a $5,000 grant from Arizona State University marked the beginning of our story. With support from the US Embassy in Vietnam, YSEALI Network, and NSE Making Innovative Educators, we brought the idea to life and our first training sessions in both Vietnam and abroad.',
    icon: '/images/journey/spark.png',
    illustration1: '/images/journey/2021a.jpg',
    illustration2: '/images/journey/2021b.jpg',
  },
  {
    year: '2022',
    title: 'Taking Root',
    content:
      'Encouraged by strong feedback, we expanded our work across the Mekong Delta. Local educators, departments throughout the area began to take notice. Our impact grew significantly, more than the U.S. Embassy Summit in Ho Chi Minh City. Phase 2 launched in six provinces. We also forged crucial educational bonds and fortified our network with more schools, ultimately reaching around 650 teachers and school leaders.',
    icon: '/images/journey/root.png',
    illustration1: '/images/journey/2022a.jpg',
    illustration2: '/images/journey/2022b.jpg',
  },
  {
    year: '2023',
    title: 'Becoming a Social Enterprise',
    content:
      'To strengthen our foundation and reach, we officially registered as FLASH VN Social Enterprise LLC in July. This change enabled us to receive new funding, find university interns, and collaborate more deeply with nonprofits and educational networks. Our work expanded to include digital literacy training, educational content and toolkits tailored to different learning environments.',
    icon: '/images/journey/enterprise.png',
    illustration1: '/images/journey/2023a.jpg',
    illustration2: '/images/journey/2023b.jpg',
  },
  {
    year: '2024',
    title: 'Reaching Wider Communities',
    content:
      'With the motto "Building Future-ready Communities", we expanded our focus to serve more diverse groups of learners and educators. We developed innovative, low-tech solutions like the VN-Tiny Board game to teach learners with limited digital access. Through partnerships with schools and organizations, we helped develop grassroots partnerships to promote digital and media literacy.',
    icon: '/images/journey/community.png',
    illustration1: '/images/journey/2024a.jpg',
    illustration2: '/images/journey/2024b.jpg',
  },
  {
    year: '2025',
    title: 'Moving Forward with Purpose',
    content:
      'Looking ahead, FLASH VN is committed to:\n• Strengthening digital literacy programs for teachers and high school students\n• Developing inclusive digital competency programs for diverse audiences\n• Co-creating adaptable educational toolkits and lesson models\n\nWe believe that meaningful change begins with small steps—through every teacher trained, every learner empowered, and every story shared. Stay here for the journey, growing hand-in-hand with our communities.',
    icon: '/images/journey/purpose.png',
    illustration1: '/images/journey/2025.jpg',
  },
];

export default function JourneySection() {
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
        const first = markersArray[0];
        const last = markersArray[markersArray.length - 1];
        
        // Kiểm tra nếu phần tử đầu tiên và cuối cùng có thể truy cập
        if (first && last) {
          const top = first.offsetTop + first.offsetHeight / 2;
          const bottom = last.offsetTop + last.offsetHeight / 2;
          
          if (top !== bottom) {
            setLineHeight(bottom - top); // Cập nhật chiều cao đường
          }
        }
      }
    }
  };

  setTimeout(() => calculateLineHeight(), 100); // Đảm bảo tính toán sau khi các phần tử được render
  window.addEventListener('resize', calculateLineHeight);

  return () => window.removeEventListener('resize', calculateLineHeight);
}, [expandedIndices]);


  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-black mb-12">Our journey</h2>

      <div className="relative" ref={containerRef}>
        {lineHeight > 0 && (
          <div
            className="absolute left-[55px] w-0.5 bg-black z-0"
            style={{
              top: '32px',
              height: `${lineHeight}px`,
            }}
          />
        )}

        <div className="space-y-8 relative z-10">
          {journeySteps.map((step, index) => {
            const isExpanded = expandedIndices.includes(index);
            const isLast = index === journeySteps.length - 1;

            return (
              <div key={index} className={`relative z-10 ${isLast ? 'step-last' : ''}`}>
                <button
                  onClick={() => toggleStep(index)}
                  className="flex items-center space-x-4 w-full text-left p-4 rounded-lg transition-colors"
                >
                  <div className="step-marker flex-shrink-0 bg-white border hover:bg-[#FFCF24] hover:border-3 border-black rounded-full px-4 py-2 text-center text-black font-bold min-w-[72px]">
                    {step.year}
                  </div>
                  <h3 className="text-lg font-semibold text-black">{step.title}</h3>
                </button>

                {isExpanded && (
                  <div className={`mt-4 ${isLast ? 'ml-0 pl-0' : 'ml-8 pl-8'}`}>
                    {isLast ? (
                      <div className="flex flex-col gap-4 animate-fadeIn">
                        <p className="text-black whitespace-pre-line max-w-4xl">{step.content}</p>
                        <div className="relative w-full h-[400px]">
                          <Image
                            src={step.illustration1}
                            alt={`${step.title} illustration`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-8 animate-fadeIn items-stretch">
                        <div className="flex flex-col justify-between">
                          <p className="text-black whitespace-pre-line">{step.content}</p>
                        </div>
                        <div className="flex flex-col gap-4 justify-between h-full">
                          <div className="relative w-full aspect-video">
                            <Image
                              src={step.illustration1}
                              alt={`${step.title} illustration 1`}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          {step.illustration2 && (
                            <div className="relative w-full aspect-video">
                              <Image
                                src={step.illustration2}
                                alt={`${step.title} illustration 2`}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
