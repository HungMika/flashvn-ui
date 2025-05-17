import React, { useState, useEffect } from 'react'; 
import AddEditPopupBase from './AddEditPopupBase';
import { AddEditSuggestFormProps, ISuggestData } from '@/features/dashboard/Teller/components/types';
import EmojiPicker from 'emoji-picker-react';

const AddEditSuggestForm: React.FC<AddEditSuggestFormProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<ISuggestData>({
    step: '',
    time: '',
    title: '',
    content: '',
    suggest: '',
    emoji: '',
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        step: initialData.step,
        time: initialData.time,
        title: initialData.title,
        content: initialData.content,
        suggest: initialData.suggest,
        emoji: initialData.emoji,
        _id: initialData._id, 
        id: initialData.id, 
      });
    } else {
      setFormData({ step: '', time: '', title: '', content: '', suggest: '', emoji: '' });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setFormData((prev) => ({ ...prev, emoji: emojiObject.emoji }));
    setShowEmojiPicker(false);
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  const getPopupTitle = initialData ? 'Sửa Quy trình thảo luận' : 'Thêm Quy trình thảo luận';

  return (
    <AddEditPopupBase isOpen={isOpen} onClose={onClose} title={getPopupTitle}>
      <div className="flex flex-col space-y-4">
        <label htmlFor="step" className="block text-sm font-medium text-gray-700">
          Bước:
        </label>
        <input
          type="text"
          id="step"
          name="step"
          value={formData.step || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />

        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Thời gian:
        </label>
        <input
          type="text"
          id="time"
          name="time"
          value={formData.time || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />

        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Tiêu đề:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />

        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Nội dung:
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content || ''}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />

        <label htmlFor="suggest" className="block text-sm font-medium text-gray-700">
          Gợi ý thảo luận:
        </label>
        <textarea
          id="suggest"
          name="suggest"
          value={formData.suggest || ''}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />

        <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">
          Emoji:
        </label>
        <div className="relative">
          <input
            type="text"
            id="emoji"
            name="emoji"
            value={formData.emoji || 'Nhấn vào đây để chọn => 🤔'}
            onChange={handleChange}
            readOnly 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          />
          {showEmojiPicker && (
            <div className="absolute z-20 top-full left-0 mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} width={300} height={400} />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-400 cursor-pointer text-white rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Lưu
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 cursor-pointer bg-orange-400 text-white rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        >
          Hủy
        </button>
      </div>
    </AddEditPopupBase>
  );
};

export default AddEditSuggestForm;