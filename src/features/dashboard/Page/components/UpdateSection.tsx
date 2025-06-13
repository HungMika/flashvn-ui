'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/contexts/i18nContext';

interface PostType {
  _id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  category: 'educator' | 'youth' | 'digcomp' | 'other';
  bool?: boolean;
  eventDate?: Date;
  createdAt?: string;
  updatedAt?: string;
}

const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function UpdateSection() {
  const { t } = useI18n();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${backendUrl}/posts?category=updates&bool=true`);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data: PostType[] = await res.json();
        setPosts(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <p>{t('page.updateSection.loading')}</p>;
  }

  if (error) {
    return <p className="text-red-500">{t('page.updateSection.error')}: {error}</p>;
  }

  const activePost = posts.find(post => post.bool === true);

  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const isAbsoluteUrl = (url: string) => /^https?:\/\//i.test(url);

  const imageUrl = activePost?.imageUrl
    ? isAbsoluteUrl(activePost.imageUrl)
      ? activePost.imageUrl
      : `${backendUrl}${activePost.imageUrl.startsWith('/') ? '' : '/'}${activePost.imageUrl}`
    : '/images/updates/latest-program.jpg';

  const updates = [
    {
      title: t('page.updateSection.latestProgramTitle'),
      summary: activePost && activePost.content ? stripHtml(activePost.content) : t('page.updateSection.noSummary'),
      link: '/what-we-do/capacity-training',
      image: imageUrl,
      buttonText: t('page.updateSection.readMore'),
    },
    {
      title: t('page.updateSection.youthFundTitle'),
      summary: t('page.updateSection.youthFundSummary'),
      link: '#',
      image: '/images/updates/youth-empowerment.jpg',
      buttonText: t('page.updateSection.readMore'),
    },
    {
      title: t('page.updateSection.newsletterTitle'),
      summary: t('page.updateSection.newsletterSummary'),
      link: 'https://drive.google.com/drive/folders/1MOS8_wekEpWQ7ujreZwyzOUGcxFykV2V?usp=sharing',
      image: '/images/updates/newsletter.jpg',
      buttonText: t('page.updateSection.download'),
    },
  ];

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4 space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-black mb-8">{t('page.updateSection.sectionTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((item, index) => (
              <div key={index} className="p-4 space-y-4 bg-white">
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
