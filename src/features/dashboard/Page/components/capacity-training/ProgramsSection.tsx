'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useI18n } from '@/contexts/i18nContext';

export interface PostType {
  _id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  category: 'educator' | 'youth' | 'digcomp' | 'other';
  bool?: boolean;
  eventDate?: string | Date;
  createdAt?: string;
  updatedAt?: string;
}

function formatDate(dateInput?: string | Date) {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

function ProgramModal({ post, onClose }: { post: PostType | null; onClose: () => void }) {
  const { t } = useI18n();
  if (!post) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const imageSrc = post.imageUrl
    ? post.imageUrl.startsWith('http')
      ? post.imageUrl
      : `${baseUrl}${post.imageUrl}`
    : null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-white text-black flex items-center justify-center z-50 p-4"
    >
      <div
        className="bg-white rounded-lg p-6 max-w-6xl border w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{post.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label={t('programs.close')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          {imageSrc && (
            <div>
              <Image
                src={imageSrc}
                alt={`Image for ${post.title}`}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProgramColumn({ title, posts }: { title: string; posts: PostType[] }) {
  const { t } = useI18n();
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  return (
    <div>
      <h3 className="text-xl font-bold text-black mb-4 md:hidden">{title}</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id!} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <h4 className="text-lg font-bold text-black mb-2">{post.title}</h4>
            <p className="text-sm text-gray-600 mb-4">
              {t('capacity-training.programs.date')}: {formatDate(post.eventDate)}
              <br />
            </p>

            <button
              onClick={() => setSelectedPost(post)}
              className="inline-block border border-black rounded-full px-4 py-2 text-sm text-black hover:bg-[#FFCF24] hover:border-2 transition-colors"
            >
              {t('capacity-training.programs.readMore')}
            </button>
          </div>
        ))}
      </div>

      <ProgramModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}

export default function ProgramsSection() {
  const { t } = useI18n();
  const [educatorPosts, setEducatorPosts] = useState<PostType[]>([]);
  const [youthPosts, setYouthPosts] = useState<PostType[]>([]);
  const [digcompPosts, setDigcompPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/posts`);
        const posts: PostType[] = res.data;

        setEducatorPosts(posts.filter((p) => p.category === 'educator'));
        setYouthPosts(posts.filter((p) => p.category === 'youth'));
        setDigcompPosts(posts.filter((p) => p.category === 'digcomp'));
        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(t('capacity-training.programs.loadError'));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [t]);

  if (loading) return <p className="text-center py-10">{t('capacity-training.programs.loading')}</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <>
      <div className="bg-blue-100 py-16">
        <div className="container mx-auto">
          <div className="hidden md:grid md:grid-cols-3 gap-8 items-center text-center">
            <div className="flex flex-col items-center">
              <Image
                src="/images/icons/educator.png"
                alt="FLASH4 Educator"
                width={200}
                height={200}
                className="mb-2"
              />
              <h3 className="text-lg font-bold text-black">
                FLASH4 <span className="text-black bg-[#FFCF24] px-2 py-2 rounded-2xl">{t('capacity-training.programs.educator')}</span>
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/icons/youth.png"
                alt="FLASH4 Youth"
                width={200}
                height={200}
                className="mb-2"
              />
              <h3 className="text-lg font-bold text-black">
                FLASH4 <span className="text-black bg-[#3F99E9] px-2 py-2 rounded-2xl">{t('capacity-training.programs.youth')}</span>
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/icons/digcomp.png"
                alt="FLASH4 Digcomp"
                width={200}
                height={200}
                className="mb-2"
              />
              <h3 className="text-lg font-bold text-black">
                FLASH4 <span className="text-black bg-[#E65A00] px-2 py-2 rounded-2xl">{t('capacity-training.programs.digcomp')}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 pb-5">
        <div className="grid md:grid-cols-3 gap-8 mt-12 space-y-8 md:space-y-0">
          <ProgramColumn title="FLASH4 Educator" posts={educatorPosts} />
          <ProgramColumn title="FLASH4 Youth" posts={youthPosts} />
          <ProgramColumn title="FLASH4 Digcomp" posts={digcompPosts} />
        </div>
      </section>
    </>
  );
}
