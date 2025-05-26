'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question, QuestionWithCounts } from '@/features/dashboard/TrustOrSelf/components/types';
import Dashboard from '@/features/dashboard/TrustOrSelf/components/Dashboard';
import AddQuestion from '@/features/dashboard/TrustOrSelf/components/AddQuestion';
import EditQuestion from '@/features/dashboard/TrustOrSelf/components/EditQuestion';
import DeleteQuestion from '@/features/dashboard/TrustOrSelf/components/DeleteQuestion';
import { fetchAllQuestions, createQuestion, updateQuestion, deleteQuestion } from '@/features/dashboard/TrustOrSelf/api/api';

const ProfilePopup: React.FC<{
  show: boolean;
  onClose: () => void;
  profileMode: 'view' | 'edit-username' | 'edit-password';
  setProfileMode: (mode: 'view' | 'edit-username' | 'edit-password') => void;
  profileUsername: string;
  setProfileUsername: (username: string) => void;
  newUsername: string;
  setNewUsername: (username: string) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  profileError: string;
  setProfileError: (error: string) => void;
}> = ({
  show,
  onClose,
  profileMode,
  setProfileMode,
  profileUsername,
  setProfileUsername,
  newUsername,
  setNewUsername,
  newPassword,
  setNewPassword,
  currentPassword,
  setCurrentPassword,
  profileError,
  setProfileError,
}) => {
  return null;
};

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
    showProfilePopup: boolean;
    profileMode: 'view' | 'edit-username' | 'edit-password';
    profileUsername: string;
    newUsername: string;
    newPassword: string;
    currentPassword: string;
    profileError: string;
  }>({
    questions: [],
    loading: true,
    errorMessage: '',
    editQuestion: null,
    newQuestion: { _id: '', content: '', title: '', trustCount: 50, selfCount: 50 },
    showAddQuestionPopup: false,
    showEditQuestionPopup: false,
    showDeleteQuestionPopup: null,
    showProfilePopup: false,
    profileMode: 'view',
    profileUsername: '',
    newUsername: '',
    newPassword: '',
    currentPassword: '',
    profileError: '',
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
        updateState({ errorMessage: 'Bạn cần đăng nhập để xem dữ liệu' });
      } else {
        updateState({ errorMessage: 'Không thể tải dữ liệu' });
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
        throw new Error('Tiêu đề và nội dung là bắt buộc');
      await createQuestion(newQuestion.content, newQuestion.title);
      await fetchData();
      callback();
      updateState({ errorMessage: '' });
    } catch (error: any) {
      if (error.response?.status === 401) {
        updateState({ errorMessage: 'Bạn cần đăng nhập để thực hiện thao tác này' });
      } else {
        updateState({ errorMessage: error.message || 'Không thể thêm câu hỏi' });
      }
    }
  };

  const handleEditQuestion = async (
    editQuestion: QuestionWithCounts,
    callback: () => void
  ): Promise<void> => {
    try {
      if (!editQuestion.content) throw new Error('Nội dung câu hỏi là bắt buộc');
      await updateQuestion(
        editQuestion._id,
        editQuestion.content,
        editQuestion.trustCount,
        editQuestion.selfCount
      );
      await fetchData();
      callback();
      updateState({ errorMessage: '' });
    } catch (error: any) {
      if (error.response?.status === 401) {
        updateState({ errorMessage: 'Bạn cần đăng nhập để thực hiện thao tác này' });
      } else {
        updateState({ errorMessage: 'Không thể sửa câu hỏi' });
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
        updateState({ errorMessage: 'Bạn cần đăng nhập để thực hiện thao tác này' });
      } else {
        updateState({ errorMessage: 'Không thể xóa câu hỏi' });
      }
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleProfile = (): void => {
    updateState({
      profileUsername: localStorage.getItem('username') || '',
      showProfilePopup: true,
      profileMode: 'view',
      profileError: '',
    });
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 font-sans bg-[#F3F4F6] min-h-screen flex flex-col">
      <Dashboard
        questions={state.questions}
        loading={state.loading}
        setEditQuestion={(editQuestion) => updateState({ editQuestion })}
        setShowEditQuestionPopup={(show) => updateState({ showEditQuestionPopup: show })}
        setShowDeleteQuestionPopup={(id) => updateState({ showDeleteQuestionPopup: id })}
        setShowAddQuestionPopup={(show) => updateState({ showAddQuestionPopup: show })}
        handleLogout={handleLogout}
        handleProfile={handleProfile}
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

      <ProfilePopup
        show={state.showProfilePopup}
        onClose={() => updateState({ showProfilePopup: false })}
        profileMode={state.profileMode}
        setProfileMode={(profileMode) => updateState({ profileMode })}
        profileUsername={state.profileUsername}
        setProfileUsername={(profileUsername) => updateState({ profileUsername })}
        newUsername={state.newUsername}
        setNewUsername={(newUsername) => updateState({ newUsername })}
        newPassword={state.newPassword}
        setNewPassword={(newPassword) => updateState({ newPassword })}
        currentPassword={state.currentPassword}
        setCurrentPassword={(currentPassword) => updateState({ currentPassword })}
        profileError={state.profileError}
        setProfileError={(profileError) => updateState({ profileError })}
      />
    </div>
  );
}
