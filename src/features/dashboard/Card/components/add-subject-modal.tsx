'use client';

import { useRef, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { createSubject } from '@/features/dashboard/Card/api/subject';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

interface AddSubjectModalProps {
  user: { _id: string };
  ageGroup: string;
  onSubjectAdded: () => void;
}

export const AddSubjectModal = ({ user, ageGroup, onSubjectAdded }: AddSubjectModalProps) => {
  const [open, setOpen] = useState(false);
  const subjectNameRef = useRef<HTMLInputElement | null>(null);

  const { mutate: addSubject, isLoading } = useMutation({
    mutationFn: (title: string) => createSubject(title, ageGroup),
    onSuccess: () => {
      toast.success('Subject added successfully!');
      subjectNameRef.current!.value = '';
      setOpen(false);
      onSubjectAdded();
    },
    onError: () => {
      toast.error('Failed to add subject!');
    },
  });

  const handleAdd = () => {
    const subjectName = subjectNameRef.current?.value.trim();
    if (!subjectName) return;
    addSubject(subjectName);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add subject</Button>
      </DialogTrigger>

      <DialogContent className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-lg">
        <DialogHeader>
          <DialogTitle>Add new subject</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input ref={subjectNameRef} placeholder="Tên subject (VD: Toán, Khoa học...)" />
        </div>

        <DialogFooter className="mt-6">
          <Button disabled={isLoading} onClick={handleAdd}>
            {isLoading ? 'Loading...' : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
