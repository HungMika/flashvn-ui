'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BiSolidLeftArrowCircle } from 'react-icons/bi';
import { getSubjectByGroup } from '@/features/dashboard/Card/api/subject';
import { Loader2, Rabbit } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

type Subject = {
  _id: string;
  title: string;
  group: string;
};

export default function GroupPage() {
  const params = useParams();
  const group = params.group as string;
  const router = useRouter();
  const [loadingSubject, setLoadingSubject] = useState<string | null>(null);

  const { data: subjects = [], isLoading } = useQuery({
    queryKey: ['subjects', group],
    queryFn: () => getSubjectByGroup(group),
    enabled: !!group,
  });

  //   useEffect(() => {
  //     if (!group) return;

  //     async function fetchSubjects() {
  //       try {
  //         setLoading(true);
  //         const data = await getSubjectByGroup(group);
  //         console.log('Subjects:', data);
  //         setSubjects(data);
  //       } catch (error) {
  //         return [];
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  //     fetchSubjects();
  //   }, [group]);

  const handleSelectSubject = (subjectId: string) => {
    setLoadingSubject(subjectId);
    router.push(`/gameplay/mil-card/${group}/${subjectId}`);
  };

  if (isLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-4">
        <div className="flex items-end gap-4">
          <div className="flex items-end gap-4">
            <Rabbit className="size-10 text-green-500 bunny" />
            <Rabbit className="size-10 text-red-500 bunny" />
            <Rabbit className="size-10 text-yellow-500 bunny" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">chờ xíu nha...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center w-full mb-4 sticky top-0 bg-white z-10 p-2">
        <BiSolidLeftArrowCircle
          className="text-green-500 text-3xl cursor-pointer hover:text-green-600 transition"
          onClick={() => router.push('/gameplay')}
        />
        <div className="text-1xl font-bold mx-auto border-b border-gray-300">Nhóm Lớp: {group}</div>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center text-gray-500">Không có môn học nào!</div>
      ) : (
        <div className="w-full overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
            {subjects.map((subject: Subject) => (
              <button
                key={subject._id}
                className="bg-white border border-gray-300 p-4 rounded-lg text-lg font-semibold 
                text-center shadow-md hover:shadow-lg transition cursor-pointer hover:bg-gray-100 relative"
                onClick={() => handleSelectSubject(subject._id)}
                disabled={loadingSubject === subject._id}
              >
                {loadingSubject === subject._id ? (
                  <Loader2 className="animate-spin text-muted-foreground mx-auto" />
                ) : (
                  subject.title
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
