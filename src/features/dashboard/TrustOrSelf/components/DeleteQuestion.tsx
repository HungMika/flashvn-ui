import { toast } from 'react-toastify';

interface DeleteQuestionPopupProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteQuestionPopup({ onClose, onConfirm }: DeleteQuestionPopupProps) {
  const handleConfirm = () => {
    onConfirm();
    toast.success('Delete successful!');
  };

  const handleCancel = () => {
    onClose();
    toast.info('Cancel delete situation.');
  };

  return (
    <div className="popupOverlay fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-2 sm:px-4">
      <div className="popup bg-[#F3F4F6] rounded-lg w-full max-w-[90%] sm:max-w-md relative">
        <div className="popupHeader bg-white text-black p-2 sm:p-2.5 rounded-t-lg text-center text-sm sm:text-base md:text-lg font-semibold border-b border-gray-200">
          Delete situation
        </div>
        <button
          onClick={handleCancel}
          className="closeButton text-gray-400 text-2xl leading-none absolute top-2 right-4 hover:text-yellow-400 transition-colors"
        >
          ×
        </button>
        <div className="formContainer p-3 sm:p-5">
          <p className="text-center text-sm sm:text-base md:text-lg mb-3 sm:mb-5 text-gray-700">
            Are you sure you want to delete this situation?
          </p>
          <div className="popupButtons flex justify-center gap-2 p-2 border-t border-gray-200 rounded-b-lg">
            <button
              onClick={handleConfirm}
              className="saveButton bg-[#3F99E9] text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-[#1B62B1] transition-colors text-xs sm:text-sm md:text-base"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="cancelButton bg-[#F5C035] text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-[#1B1B62] transition-colors text-xs sm:text-sm md:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}