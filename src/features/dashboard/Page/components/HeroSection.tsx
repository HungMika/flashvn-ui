'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/features/dashboard/Page/styles/globals.css'; 


export default function HeroSection() {
  const banners = [
    {
      image: '/images/banner/banner1.jpg',
      alt: 'Group of students and educators',
    },
    {
      image: '/images/banner/banner2.jpg',
      alt: 'Empowering educators',
    },
    {
      image: '/images/banner/banner3.jpg',
      alt: 'Inspiring youth',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center py-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-500">
              Building a{' '}<br />
              <span className="text-black bg-[#FFCF24] px-2 rounded-2xl">
                #future-ready
              </span>{' '}
              community
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              By providing digital-capacity training and innovative solutions for youth and educators
            </p>
            <div>
              <Link
                href="/what-we-do"
                className="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 hover:bg-[#FFCF24] hover:text-black transition-colors rounded-full text-lg font-medium"
              >
                Find out more
              </Link>
            </div>
          </div>
          <div className="w-full">
            <div className="relative h-[400px] w-full">
              <Image
                src={banners[currentIndex].image}
                alt={banners[currentIndex].alt}
                fill
                className="object-cover border-2 border-black rounded-lg shadow-lg"
                priority
              />
              <img
                src="/images/icons/icon2.png"
                alt="Floating circle 1"
                className="absolute -top-15 -right-15 w-[150px] h-[150px] rounded-full animate-bounce-move"
              />

              <img
                src="/images/icons/icon4.png"
                alt="Floating circle 2"
                className="absolute -bottom-10 -left-10 w-[70px] h-[70px] rounded-full animate-float-diagonal"
              />
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              {banners.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-15 bg-gray-400' : 'w-3 bg-gray-400'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}