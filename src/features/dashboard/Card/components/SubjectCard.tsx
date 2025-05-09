'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Pencil, Loader2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

import { useConfirm } from '@/hooks/use-confirm';
import { deleteSubject, updateSubject } from '@/features/dashboard/Card/api/subject';

const ageGroups = ['1-2', '3-5', '6-8', '9-12'];

interface SubjectCardProps {
  id: string;
  title: string;
  ageGroup: string;
  onChange: () => void;
}

export const SubjectCard = ({ id, title, ageGroup, onChange }: SubjectCardProps) => {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newAgeGroup, setNewAgeGroup] = useState(ageGroup);
  const [navigating, setNavigating] = useState(false);

  const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'This action cannot be undone');
  const queryClient = useQueryClient();

  // Mutation: Delete
  const deleteMutation = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      toast.success('Subject deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      onChange();
    },
    onError: () => {
      toast.error('Error deleting subject');
    },
  });

  // Mutation: Update
  const updateMutation = useMutation({
    mutationFn: ({ id, title, ageGroup }: { id: string; title: string; ageGroup: string }) =>
      updateSubject(id, title, ageGroup),
    onSuccess: () => {
      toast.success('Subject updated successfully');
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      setEditOpen(false);
      onChange();
    },
    onError: () => {
      toast.error('Error updating subject');
    },
  });

  const handleDelete = async () => {
    const confirmed = await confirm();
    if (!confirmed) return;
    deleteMutation.mutate(id);
  };

  const handleEdit = () => {
    const trimmedTitle = newTitle.trim();
    const trimmedAgeGroup = newAgeGroup.trim();

    if (!trimmedTitle || !trimmedAgeGroup) {
      toast.error('Please enter valid name and age group.');
      return;
    }

    updateMutation.mutate({ id, title: trimmedTitle, ageGroup: trimmedAgeGroup });
  };

  const handleNavigate = () => {
    if (navigating) return;
    setNavigating(true);
    router.replace(`/dashboard/age-group/${ageGroup}/subject/${id}`);
  };

  return (
    <>
      <ConfirmDialog />
      <Card
        onClick={handleNavigate}
        className="relative p-4 flex items-center justify-between hover:shadow-md cursor-pointer min-h-[80px]"
      >
        {navigating && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        )}

        <div className="flex flex-col gap-2 justify-center z-0">
          <p className="font-semibold text-black">{title}</p>
        </div>

        <div className="flex items-center gap-2 z-0" onClick={(e) => e.stopPropagation()}>
          <Dialog
            open={editOpen}
            onOpenChange={(open) => {
              setEditOpen(open);
              if (!open) {
                setNewTitle(title);
                setNewAgeGroup(ageGroup);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil className="w-4 h-4 text-blue-500" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-lg">
              <DialogHeader>
                <DialogTitle>Edit Subject</DialogTitle>
              </DialogHeader>

              <div className="space-y-2">
                <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="New Subject Name" />
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">Age Group</label>
                  <select
                    value={newAgeGroup}
                    onChange={(e) => setNewAgeGroup(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    {ageGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button
                  onClick={handleEdit}
                  disabled={updateMutation.isLoading}
                  className="bg-[#3f99e9] hover:bg-blue-500 font-semibold text-white"
                >
                  {updateMutation.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="icon" onClick={handleDelete} disabled={deleteMutation.isLoading}>
            {deleteMutation.isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-red-500" />
            ) : (
              <Trash2 className="w-4 h-4 text-red-500" />
            )}
          </Button>
        </div>
      </Card>
    </>
  );
};
