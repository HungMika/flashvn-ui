'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getQuestionsBySubject, deleteQuestion } from '@/features/dashboard/Card/api/question';
import { AddQuestionModal } from '@/features/dashboard/Card/components/add-question-modal';
import { QuestionCard } from '@/features/dashboard/Card/components/QuestionCard';
import { EditQuestionModal } from '@/features/dashboard/Card/components/edit-question-modal';
import { useConfirm } from '@/hooks/use-confirm';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Question = {
  _id: string;
  title: string;
  correctAnswer: string;
  wrongAnswers?: string[];
};

export default function SubjectPage() {
  const { subjectId } = useParams();
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'This action cannot be undone');

  const queryClient = useQueryClient();

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ['questions', subjectId],
    queryFn: () => getQuestionsBySubject(subjectId as string),
    enabled: !!subjectId,
  });

  const { mutate: deleteSubjectQuestion, isLoading: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteQuestion(id),
    onSuccess: () => {
      toast.success('Deleted OK!');
      queryClient.invalidateQueries(['questions', subjectId]);
    },
    onError: () => {
      toast.error('Delete failed!');
    },
  });

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (!confirmed) return;
    deleteSubjectQuestion(id);
  };

  if (isLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <ConfirmDialog />
      <div className="flex flex-col items-center min-h-screen p-4 w-full max-w-screen-lg mx-auto">
        <div className="w-full max-h-[600px] overflow-hidden border p-4 rounded-lg">
          <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
            {questions.length === 0 ? (
              <p className="text-center text-muted-foreground mb-4">No questions found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
                {questions.map((q: Question) => (
                  <QuestionCard
                    key={q._id}
                    question={{ ...q, wrongAnswer: q.wrongAnswers ?? [] }}
                    onEdit={(question) => setEditingQuestion(question)}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <AddQuestionModal
            subjectId={subjectId as string}
            onQuestionAdded={() => queryClient.invalidateQueries(['questions', subjectId])}
          />
        </div>

        {editingQuestion && (
          <EditQuestionModal
            question={{
              ...editingQuestion,
              wrongAnswers: editingQuestion.wrongAnswers ?? [],
            }}
            subjectId={subjectId as string}
            onClose={() => setEditingQuestion(null)}
            onQuestionUpdated={() => queryClient.invalidateQueries(['questions', subjectId])}
          />
        )}
      </div>
    </>
  );
}
