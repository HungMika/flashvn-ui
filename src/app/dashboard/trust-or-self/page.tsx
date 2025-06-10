'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question, QuestionWithCounts } from '@/features/dashboard/TrustOrSelf/components/types';
import Dashboard from '@/features/dashboard/TrustOrSelf/components/Dashboard';
import AddQuestion from '@/features/dashboard/TrustOrSelf/components/AddQuestion';
import EditQuestion from '@/features/dashboard/TrustOrSelf/components/EditQuestion';
import DeleteQuestion from '@/features/dashboard/TrustOrSelf/components/DeleteQuestion';
import { fetchAllQuestions, createQuestion, updateQuestion, deleteQuestion } from '@/features/dashboard/TrustOrSelf/api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [state, setState] = useState<{
    questions: QuestionWithCounts[];
    loading: boolean;
    errorMessage: string;
    editQuestion: QuestionWithCounts | null;
    newQuestion: Partial<Question>;
    showAddQuestionPopup: boolean;
    showEditQuestionPopup: boolean;
    showDeleteQuestionPopup: string | null;
  }>({
    questions: [],
    loading: true,
    errorMessage: '',
    editQuestion: null,
    newQuestion: { _id: '', content: '', title: '', trustCount: 50, selfCount: 50 },
    showAddQuestionPopup: false,
    showEditQuestionPopup: false,
    showDeleteQuestionPopup: null,
  });

  const updateState = (updates: Partial<typeof state>) => setState((prev) => ({ ...prev, ...updates }));

  useEffect(() => {
    fetchData();
  }, [router]);

  const fetchData = async (): Promise<void> => {
    updateState({ loading: true });
    try {
      const questionsData = await fetchAllQuestions();
      updateState({ questions: questionsData, errorMessage: '' });
    } catch (error: any) {
      if (error.response?.status === 401) {
        updateState({ errorMessage: 'You need to login to perform this action.' });
        toast.error('You need to login to perform this action.');
      } else {
        updateState({ errorMessage: 'Unable to load data.' });
        toast.error('Unable to load data.');
      }
    } finally {
      updateState({ loading: false });
    }
  };

  const handleAddQuestion = async (
    newQuestion: Partial<Question>,
    callback: () => void
  ): Promise<void> => {
    try {
      if (!newQuestion.content || !newQuestion.title)
        throw new Error('Title and content cannot be empty.');
      await createQuestion(
        newQuestion.content,
        newQuestion.title,
        newQuestion.trustCount ?? 50,
        newQuestion.selfCount ?? 50
      );
      await fetchData();
      callback();
      updateState({ errorMessage: '' });
      toast.success('Add successful!');
    } catch (error: any) {
      if (error.response?.status === 401) {
        updateState({ errorMessage: 'You need to login to perform this action.' });
        toast.error('You need to login to perform this action.');
      } else {
        updateState({ errorMessage: error.message || 'Add failed' });
        toast.error(error.message || 'Add failed');
      }
    }
  };

  const handleEditQuestion = async (
    editQuestion: QuestionWithCounts,
    callback: () => void
  ): Promise<void> => {
    try {
      if (!editQuestion.content || !editQuestion.title)
        throw new Error('Title and content cannot be empty.');
      await updateQuestion(
        editQuestion._id,
        editQuestion.content,
        editQuestion.title,
        editQuestion.trustCount ?? 50,
        editQuestion.selfCount ?? 50
      );
      await fetchData();
      callback();
      updateState({ errorMessage: '' });
      toast.success('Correct the situation successfully!');
    } catch (error: any) {
      if (error.response?.status === 401) {
        updateState({ errorMessage: 'You need to login to perform this action.' });
        toast.error('You need to login to perform this action.');
      } else {
        updateState({ errorMessage: error.message || 'Repair the failed' });
        toast.error(error.message || 'Repair the failed');
      }
    }
  };

  const handleDeleteQuestion = async (id: string, callback: () => void): Promise<void> => {
    try {
      await deleteQuestion(id);
      await fetchData();
      callback();
      updateState({ errorMessage: '' });
    } catch (error: any) {
      if (error.response?.status === 401) {
        updateState({ errorMessage: 'You need to login to perform this action.' });
        toast.error('You need to login to perform this action.');
      } else {
        updateState({ errorMessage: 'Delete failed.' });
        toast.error('Delete failed');
      }
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    router.push('/');
    toast.info('Loogged out!');
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 font-sans bg-[#F3F4F6] min-h-screen flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
      <Dashboard
        questions={state.questions}
        loading={state.loading}
        setEditQuestion={(editQuestion) => updateState({ editQuestion })}
        setShowEditQuestionPopup={(show) => updateState({ showEditQuestionPopup: show })}
        setShowDeleteQuestionPopup={(id) => updateState({ showDeleteQuestionPopup: id })}
        setShowAddQuestionPopup={(show) => updateState({ showAddQuestionPopup: show })}
        handleLogout={handleLogout}
      />

      {state.showAddQuestionPopup && (
        <AddQuestion
          newQuestion={state.newQuestion}
          setNewQuestion={(newQuestion) => updateState({ newQuestion })}
          errorMessage={state.errorMessage}
          onClose={() => updateState({ showAddQuestionPopup: false })}
          onSave={(newQuestion: Partial<Question>) =>
            handleAddQuestion(newQuestion, () => {
              updateState({
                newQuestion: { _id: '', content: '', title: '', trustCount: 50, selfCount: 50 },
                showAddQuestionPopup: false,
              });
            })
          }
        />
      )}

      {state.showEditQuestionPopup && state.editQuestion && (
        <EditQuestion
          editQuestion={state.editQuestion}
          setEditQuestion={(editQuestion) => updateState({ editQuestion })}
          errorMessage={state.errorMessage}
          onClose={() => updateState({ showEditQuestionPopup: false, editQuestion: null })}
          onSave={(editQuestion: QuestionWithCounts) =>
            handleEditQuestion(editQuestion, () => {
              updateState({ editQuestion: null, showEditQuestionPopup: false });
            })
          }
        />
      )}

      {state.showDeleteQuestionPopup && (
        <DeleteQuestion
          onClose={() => updateState({ showDeleteQuestionPopup: null })}
          onConfirm={() =>
            handleDeleteQuestion(state.showDeleteQuestionPopup!, () => updateState({ showDeleteQuestionPopup: null }))
          }
        />
      )}
    </div>
  );
}