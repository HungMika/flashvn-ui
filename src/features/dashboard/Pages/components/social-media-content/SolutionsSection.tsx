'use client';

import React from 'react';

const SolutionsSection = () => {
  const socialMedia = [
    {
      name: 'Fanpage',
      icon: '/images/icons/facebook.png',
      link: 'https://www.facebook.com/duanflashvn',
    },
    {
      name: 'Tiktok',
      icon: '/images/icons/tiktok.png',
      link: 'https://www.tiktok.com/@flashvn',
    },
    {
      name: 'Youtube',
      icon: '/images/icons/youtube.png',
      link: 'https://www.youtube.com/@duanflashvn',
    },
  ];

  return (
    <section className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl  font-bold mb-4">
          Follow us on{' '}
          <span className="text-black bg-[#FFCF24] px-2 py-1 rounded-2xl">
            social media
          </span>
        </h2>
        <p className="text-gray-700 mb-8">
          for the useful tech tips and update the latest information!
        </p>

        {/* Social Media Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialMedia.map((media, index) => (
            <a
              key={index}
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={media.icon}
                alt={media.name}
                className="w-16 h-16 mb-4"
              />
              <p className="text-lg font-bold">{media.name}</p>
            </a>
          ))}
        </div>

        {/* Illustration
        <div className="mt-8 flex justify-center">
          <img
            src="/images/illustrations/social-media.png"
            alt="Social Media Illustration"
            className="w-64 h-auto"
          />
        </div> */}
      </div>
    </section>
  );
};

export default SolutionsSection;