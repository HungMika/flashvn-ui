'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon, Plus, Trash2 } from 'lucide-react';
import { createQuestion } from '@/features/dashboard/Card/api/question';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

interface AddQuestionModalProps {
  subjectId: string;
  onQuestionAdded: () => void;
}

export const AddQuestionModal = ({ subjectId, onQuestionAdded }: AddQuestionModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const correctAnswerRef = useRef<HTMLInputElement | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<string[]>(['']);

  const handleAddWrongAnswer = () => {
    setWrongAnswer([...wrongAnswer, '']);
  };

  const handleRemoveWrongAnswer = (index: number) => {
    setWrongAnswer((prev) => prev.filter((_, i) => i !== index));
  };

  const handleWrongAnswerChange = (index: number, value: string) => {
    setWrongAnswer((prev) => prev.map((ans, i) => (i === index ? value : ans)));
  };

  const { mutate: addSubjectQuestion, isLoading } = useMutation({
    mutationFn: (payload: { title: string; correctAnswer: string; wrongAnswers: string[] }) =>
      createQuestion(subjectId, payload),
    onSuccess: () => {
      toast.success('Question added successfully!');
      setOpen(false);
      titleRef.current!.value = '';
      correctAnswerRef.current!.value = '';
      setWrongAnswer(['']);
      onQuestionAdded();
    },
    onError: () => {
      toast.error('Something went wrong!');
    },
  });

  const handleSubmit = async () => {
    const title = titleRef.current?.value.trim();
    const correctAnswer = correctAnswerRef.current?.value.trim();
    const filteredwrongAnswer = wrongAnswer.map((ans) => ans.trim()).filter((ans) => ans !== '');

    if (!title || !correctAnswer || filteredwrongAnswer.length === 0) {
      toast.error('please fill all fields!');
      return;
    }

    addSubjectQuestion({
      title,
      correctAnswer,
      wrongAnswers: filteredwrongAnswer,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ Add Question</Button>
      </DialogTrigger>

      <DialogContent className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-lg">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input ref={titleRef} placeholder="Question here..." />

          <div className="relative">
            <Input
              ref={correctAnswerRef}
              placeholder="Correct answer..."
              className="border-green-500 focus:ring-green-500"
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-600 text-sm">
              <CheckCircleIcon className="w-4 h-4" />
            </span>
          </div>

          {/* Wrong Answer list*/}
          <div className="max-h-[200px] overflow-y-auto scrollbar-hide space-y-2">
            {wrongAnswer.map((ans, index) => (
              <div key={index} className="relative flex items-center">
                <Input
                  value={ans}
                  onChange={(e) => handleWrongAnswerChange(index, e.target.value)}
                  placeholder={`Wrong Answer ${index + 1}...`}
                  className="border-red-400 focus:ring-red-500"
                />
                {wrongAnswer.length > 1 && (
                  <button
                    onClick={() => handleRemoveWrongAnswer(index)}
                    className="absolute right-3 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full flex items-center justify-center" onClick={handleAddWrongAnswer}>
            <Plus size={16} className="mr-1" /> Add Wrong Answer
          </Button>
        </div>

        <DialogFooter className="mt-6">
          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? 'Saving...' : 'Add Question'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
