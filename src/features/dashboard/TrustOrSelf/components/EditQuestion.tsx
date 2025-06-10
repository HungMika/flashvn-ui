import { QuestionWithCounts } from '@/features/dashboard/TrustOrSelf/components/types';
import { toast } from 'react-toastify';

interface EditQuestionPopupProps {
  editQuestion: QuestionWithCounts;
  setEditQuestion: (question: QuestionWithCounts) => void;
  errorMessage: string;
  onClose: () => void;
  onSave: (editQuestion: QuestionWithCounts) => void;
}

export default function EditQuestionPopup({
  editQuestion,
  setEditQuestion,
  errorMessage,
  onClose,
  onSave,
}: EditQuestionPopupProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trustCount = editQuestion.trustCount ?? 50;
    const selfCount = editQuestion.selfCount ?? 50;
    if (isNaN(trustCount) || isNaN(selfCount)) {
      toast.error('Trust and Self must be valid numbers!');
      return;
    }
    onSave({ ...editQuestion, trustCount, selfCount });
  };

  const handleResetClick = () => {
    setEditQuestion({ ...editQuestion, trustCount: 50, selfCount: 50 });
    toast.success('Reset successful!');
  };

  return (
    <div className="popupOverlay fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-2 sm:px-4">
      <div className="popup bg-[#F3F4F6] rounded-lg w-full max-w-[90%] sm:max-w-md relative">
        <div className="popupHeader bg-white text-black p-2 sm:p-2.5 rounded-t-lg text-center text-sm sm:text-base md:text-lg font-semibold border-b border-gray-200">
          Fix the situation
        </div>
        <button
          onClick={onClose}
          className="closeButton text-gray-400 text-2xl leading-none absolute top-2 right-4 hover:text-yellow-400 transition-colors"
        >
          ×
        </button>
        <div className="formContainer p-3 sm:p-5 overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-hide">
          <form onSubmit={handleSubmit}>
            <label className="formLabel block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Title</label>
            <input
              type="text"
              value={editQuestion.title || ''}
              onChange={(e) => setEditQuestion({ ...editQuestion, title: e.target.value })}
              placeholder="Enter title"
              className="formInput w-full p-1 sm:p-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="formLabel block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Content</label>
            <textarea
              value={editQuestion.content || ''}
              onChange={(e) => setEditQuestion({ ...editQuestion, content: e.target.value })}
              placeholder="Enter content"
              className="formInput w-full p-1 sm:p-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="formLabel block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Trust</label>
            <input
              type="number"
              value={editQuestion.trustCount ?? 50}
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value, 10) : 50;
                setEditQuestion({ ...editQuestion, trustCount: value });
              }}
              placeholder="Trust Count"
              className="formInput w-full p-1 sm:p-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="formLabel block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Self</label>
            <input
              type="number"
              value={editQuestion.selfCount ?? 50}
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value, 10) : 50;
                setEditQuestion({ ...editQuestion, selfCount: value });
              }}
              placeholder="Self Count"
              className="formInput w-full p-1 sm:p-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errorMessage && (
              <p className="text-red-500 text-xs sm:text-sm mb-2 sm:mb-4">{errorMessage}</p>
            )}
            <div className="popupButtons flex flex-col justify-end sm:flex-row gap-2 p-2 border-t border-gray-200 rounded-b-lg">
              <button
                type="button"
                onClick={handleResetClick}
                className="resetButton bg-gray-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-[#1B1B62] transition-colors text-xs sm:text-sm md:text-base mb-2 sm:mb-0"
              >
                Reset 50/50
              </button>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="saveButton bg-[#3F99E9] text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-[#1B62B1] transition-colors text-xs sm:text-sm md:text-base"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="cancelButton bg-[#F5C035] text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-[#1B1B62] transition-colors text-xs sm:text-sm md:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}