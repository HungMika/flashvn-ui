'use client';
import React, { useState, useEffect } from 'react';
import AddEditPopupBase from './AddEditPopupBase';
import { AddEditCardFormProps, ICardFormData } from '@/features/dashboard/Teller/components/types';

const AddEditCardForm: React.FC<AddEditCardFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  table,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    group: 'times' | 'majors' | 'technologies' | 'impacts';
  }>({
    title: '',
    group: table,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData.title,
        group: initialData.group as 'times' | 'majors' | 'technologies' | 'impacts',
      });
      setImagePreview(typeof initialData.image === 'string' && initialData.image.startsWith('http') ? initialData.image : null);
      setImageFile(null);
    } else {
      setFormData({ title: '', group: table });
      setImagePreview(null);
      setImageFile(null);
    }
    setError('');
  }, [initialData, isOpen, table]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (!formData.title) {
      setError('Title is required');
      return;
    }
    if (!initialData && !imageFile) {
      setError('Image is required');
      return;
    }

    const dataToSave: ICardFormData = {
      title: formData.title.trim(),
      group: table,
      image: imageFile || (initialData?.image as string) || '',
    };

    console.log('Saving card data:', dataToSave);
    onSave(dataToSave);
    onClose();
  };

  const getPopupTitle = () => {
    const action = initialData ? 'Repair' : 'Add';
    let tableTitle = '';
    switch (table) {
      case 'times':
        tableTitle = 'Time';
        break;
      case 'majors':
        tableTitle = 'Major';
        break;
      case 'technologies':
        tableTitle = 'Technology';
        break;
      case 'impacts':
        tableTitle = 'Impact';
        break;
      default:
        tableTitle = 'Data';
    }
    return `${action} ${tableTitle}`;
  };

  return (
    <AddEditPopupBase isOpen={isOpen} onClose={onClose} title={getPopupTitle()}>
      <div className="flex flex-col space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
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

        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Choose image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 block w-full text-sm cursor-pointer text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-md" onError={() => setImagePreview(null)} />
        )}
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
          Cancel
        </button>
      </div>
    </AddEditPopupBase>
  );
};

export default AddEditCardForm;