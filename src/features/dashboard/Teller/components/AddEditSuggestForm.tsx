import React, { useState, useEffect } from 'react';
import AddEditPopupBase from './AddEditPopupBase';
import { AddEditSuggestFormProps, ISuggestData } from '@/features/dashboard/Teller/components/types';

const AddEditSuggestForm: React.FC<AddEditSuggestFormProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<ISuggestData>({
    step: '',
    time: '',
    title: '',
    content: '',
    suggest: '',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        step: initialData.step || '',
        time: initialData.time || '',
        title: initialData.title || '',
        content: initialData.content || '',
        suggest: initialData.suggest || '',
      });
    } else {
      setFormData({ step: '', time: '', title: '', content: '', suggest: '' });
    }
    setError('');
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = () => {
    if (!formData.step || !formData.time || !formData.title || !formData.content || !formData.suggest) {
      setError('Required fields cannot be left blank.');
      return;
    }
    const dataToSave: ISuggestData = {
      step: formData.step.trim(),
      time: formData.time.trim(),
      title: formData.title.trim(),
      content: formData.content.trim(),
      suggest: formData.suggest.trim(),
      _id: formData._id,
    };
    console.log('Saving suggest data:', dataToSave);
    onSave(dataToSave);
    onClose();
  };

  const getPopupTitle = initialData ? 'Repair Discussion Suggestions' : 'Add Discussion Suggestions';

  return (
    <AddEditPopupBase isOpen={isOpen} onClose={onClose} title={getPopupTitle}>
      <div className="flex flex-col space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <label htmlFor="step" className="block text-sm font-medium text-gray-700">
          Step:
        </label>
        <input
          type="text"
          id="step"
          name="step"
          value={formData.step}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />

        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Time:
        </label>
        <input
          type="text"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />

        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />

        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content:
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />

        <label htmlFor="suggest" className="block text-sm font-medium text-gray-700">
          Discussion Suggestions:
        </label>
        <textarea
          id="suggest"
          name="suggest"
          value={formData.suggest}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-400 cursor-pointer text-white rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 cursor-pointer bg-orange-400 text-white rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        >
          Cancle
        </button>
      </div>
    </AddEditPopupBase>
  );
};

export default AddEditSuggestForm;
