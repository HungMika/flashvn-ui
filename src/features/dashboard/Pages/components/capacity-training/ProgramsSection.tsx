"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProgramModal({ program, onClose }: { 
  program: { title: string; createdAt: string; link: string; content?: string; image?: string } | null; 
  onClose: () => void 
}) {
  if (!program) return null;

  // Hàm xử lý khi click bên ngoài modal content
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOutsideClick} // Áp dụng sự kiện click bên ngoài
      className="fixed inset-0 bg-white text-black flex items-center justify-center z-50 p-4"
    >
      <div
        className="bg-white rounded-lg p-6 max-w-6xl border w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Ngăn chặn click bên trong lan ra ngoài
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{program.title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {program.content && (
              <div className="whitespace-pre-line text-gray-700">
                {program.content}
              </div>
            )}
          </div>
          {program.image && (
            <div>
              <Image 
                src={program.image}
                alt={program.title}
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



function ProgramColumn({ 
  title, 
  programs 
}: { 
  title: string; 
  programs: { title: string; createdAt: string; link: string; content?: string; image?: string }[] 
}) {
  const [selectedProgram, setSelectedProgram] = useState<{
    title: string; 
    createdAt: string; 
    link: string;
    content?: string;
    image?: string;
  } | null>(null);

  return (
    <div>
      <h3 className="text-xl font-bold text-black mb-4 md:hidden">{title}</h3>
      <div className="space-y-4">
        {programs.map((program, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <h4 className="text-lg font-bold text-black mb-2">{program.title}</h4>
            <p className="text-sm text-gray-600 mb-4">
              Date: {new Date(program.createdAt).toISOString().split('T')[0]}
            </p>

            <button
              onClick={() => setSelectedProgram(program)}
              className="inline-block border border-black rounded-full px-4 py-2 text-sm text-black hover:bg-[#FFCF24] hover:border-2 transition-colors"
            >
              Read more
            </button>
          </div>
        ))}
      </div>
      
      <ProgramModal 
        program={selectedProgram} 
        onClose={() => setSelectedProgram(null)} 
      />
    </div>
  );
}

export default function ProgramsSection() {
  const [educatorPrograms, setEducatorPrograms] = useState([]);
  const [youthPrograms, setYouthPrograms] = useState([]);
  const [digcompPrograms, setDigcompPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        const posts = res.data;

        setEducatorPrograms(posts.filter((p: any) => p.category === 'educator'));
        setYouthPrograms(posts.filter((p: any) => p.category === 'youth'));
        setDigcompPrograms(posts.filter((p: any) => p.category === 'digcomp'));
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu chương trình:', error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <>
      <div className="bg-blue-100 py-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center text-center">
            <div className="flex flex-col items-center">
              <Image
                src="/images/icons/educator.png"
                alt="FLASH4 Educator"
                width={200}
                height={200}
                className="mb-2"
              />
              <h3 className="text-lg font-bold text-black">FLASH4{' '}<span className="text-black bg-[#FFCF24] px-2 py-2 rounded-2xl">
                Educator
              </span></h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/icons/youth.png"
                alt="FLASH4 Youth"
                width={200}
                height={200}
                className="mb-2"
              />
              <h3 className="text-lg font-bold text-black">FLASH4{' '}<span className="text-black bg-[#3F99E9] px-2 py-2 rounded-2xl">
                Youth
              </span></h3>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/icons/digcomp.png"
                alt="FLASH4 Digcomp"
                width={200}
                height={200}
                className="mb-2"
              />
              <h3 className="text-lg font-bold text-black">FLASH4{' '}<span className="text-black bg-[#E65A00] px-2 py-2 rounded-2xl">
                Digcomp
              </span></h3>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 pb-5">
        <div className="grid md:grid-cols-3 gap-8 mt-12 space-y-8 md:space-y-0">
          <ProgramColumn title="FLASH4 Educator" programs={educatorPrograms} />
          <ProgramColumn title="FLASH4 Youth" programs={youthPrograms} />
          <ProgramColumn title="FLASH4 Digcomp" programs={digcompPrograms} />
        </div>
      </section>
    </>
  );
}
