'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSubjectByGroup } from '@/features/dashboard/Card/api/subject';
import { AgeGroupSelector } from '@/features/dashboard/Card/components/AgeGroupSelector';
import { SubjectCard } from '@/features/dashboard/Card/components/SubjectCard';
import { AddSubjectModal } from '@/features/dashboard/Card/components/add-subject-modal';
import { useAuthStore } from '@/features/auth/api/auth-store';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Subject = {
  _id: string;
  userId: string;
  title: string;
  group: string;
};

export default function DashboardPage() {
  const [selectedAge, setSelectedAge] = useState<string>('');
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const {
    data: subjects = [],
    isLoading,
    refetch,
  } = useQuery<Subject[]>({
    queryKey: ['subjects', selectedAge],
    queryFn: () => getSubjectByGroup(selectedAge),
    enabled: !!selectedAge,
  });

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6 flex-1">
        <div className="relative flex items-center justify-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
            className="absolute left-0 border border-muted p-2 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Select group</h1>
        </div>

        <AgeGroupSelector selectedAge={selectedAge} onSelect={setSelectedAge} />

        {selectedAge && (
          <div className="relative border rounded-lg p-4 flex flex-col max-h-[480px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                <p className="ml-2">Loading...</p>
              </div>
            ) : (
              <>
                <div className="overflow-y-auto flex-1 mb-4">
                  {subjects.length === 0 ? (
                    <p className="text-center text-muted-foreground">No subjects found.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {subjects.map((subject) => (
                        <SubjectCard
                          key={subject._id}
                          id={subject._id}
                          title={subject.title}
                          ageGroup={subject.group}
                          onChange={refetch}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-auto flex justify-center">
                  <AddSubjectModal user={user} ageGroup={selectedAge} onSubjectAdded={refetch} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
