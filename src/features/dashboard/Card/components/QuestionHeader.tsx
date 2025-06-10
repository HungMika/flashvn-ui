'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSubjectById } from '@/features/dashboard/Card/api/subject';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const QuestionHeader = () => {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;
  const subjectId = params.subjectId as string;

  const { data: subject } = useQuery({
    queryKey: ['subject', subjectId],
    queryFn: () => getSubjectById(subjectId),
    enabled: !!subjectId,
  });

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push('/dashboard/mil-card')}
        className="border border-gray-300 p-2"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <div className="flex-1 text-center text-lg font-semibold text-gray-700">
        Check group: {groupId} — {subject?.title ?? ''}
      </div>

      <div className="w-10" />
    </div>
  );
};
