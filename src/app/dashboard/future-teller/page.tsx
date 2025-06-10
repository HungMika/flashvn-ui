'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminTable from '@/features/dashboard/Teller/components/AdminTable';
import AddEditCardForm from '@/features/dashboard/Teller/components/AddEditCardForm';
import AddEditSuggestForm from '@/features/dashboard/Teller/components/AddEditSuggestForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa';
import { ftCardApi, ftSuggestApi } from '@/features/dashboard/Teller/api/ftApi';
import { ICardData, ISuggestData, ICardFormData } from '@/features/dashboard/Teller/components/types';

type TableType = 'times' | 'majors' | 'technologies' | 'impacts' | 'outlines';

export default function TellerAdminPage() {
  const router = useRouter();
  const [state, setState] = useState<{
    activeTab: TableType;
    data: ICardData[] | ISuggestData[];
    loading: boolean;
    errorMessage: string;
    isAddEditPopupOpen: boolean;
    editData: ICardData | ISuggestData | null;
  }>({
    activeTab: 'times',
    data: [],
    loading: true,
    errorMessage: '',
    isAddEditPopupOpen: false,
    editData: null,
  });

  const updateState = (updates: Partial<typeof state>) => setState((prev) => ({ ...prev, ...updates }));

  useEffect(() => {
    fetchData();
  }, [state.activeTab]);

  const fetchData = async (): Promise<void> => {
    updateState({ loading: true });
    try {
      let data: ICardData[] | ISuggestData[];
      if (state.activeTab === 'outlines') {
        data = await ftSuggestApi.getAll();
      } else {
        data = await ftCardApi.getAllByGroup(state.activeTab);
      }
      updateState({ data, errorMessage: '' });
    } catch (error: any) {
      updateState({ errorMessage: error.message || 'Unable to load data.' });
      toast.error(error.message || 'Unable to load data.');
    } finally {
      updateState({ loading: false });
    }
  };

  const handleSave = async (newData: ICardFormData | ISuggestData, callback: () => void): Promise<void> => {
    try {
      if (state.activeTab === 'outlines') {
        const suggestData = { ...newData } as ISuggestData;
        if (state.editData && state.editData._id) {
          await ftSuggestApi.updateSuggest(state.editData._id, suggestData);
          toast.success(`Updated ${state.activeTab} success!`);
        } else {
          await ftSuggestApi.createSuggest(suggestData);
          toast.success(`Added ${state.activeTab} success!`);
        }
      } else {
        const cardData = newData as ICardFormData;
        if (!cardData.title || !cardData.group) {
          throw new Error('Required fields cannot be left blank.');
        }

        if (state.editData && state.editData._id) {
          const payload: { title: string; group: string; image?: File } = {
            title: cardData.title,
            group: cardData.group,
          };
          if (typeof cardData.image !== 'string' && cardData.image) {
            payload.image = cardData.image;
          }
          await ftCardApi.updateCard(state.editData._id, payload);
          toast.success(`Updated ${state.activeTab} success!`);
        } else {
          if (!cardData.image || typeof cardData.image === 'string') {
            throw new Error('Image is required');
          }
          await ftCardApi.createCard({
            title: cardData.title,
            group: cardData.group,
            image: cardData.image,
          });
          toast.success(`Added ${state.activeTab} success!`);
        }
      }

      await fetchData();
      callback();
      updateState({ errorMessage: '' });
    } catch (error: any) {
      updateState({ errorMessage: error.message || 'Save failed' });
      toast.error(error.message || 'Save failed');
    }
  };

  const handleDeleteClick = async (id: string): Promise<void> => {
    try {
      if (!window.confirm('Are you sure you want to delete this item?')) return;
      if (state.activeTab === 'outlines') {
        await ftSuggestApi.deleteSuggest(id);
      } else {
        await ftCardApi.deleteCard(id);
      }
      await fetchData();
      updateState({ errorMessage: '' });
      toast.success('Delete success!');
    } catch (error: any) {
      updateState({ errorMessage: error.message || 'Delete failed.' });
      toast.error(error.message || 'Delete failed.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-wrap gap-2 mb-6">
        {['times', 'majors', 'technologies', 'impacts', 'outlines'].map((tab) => (
          <button
            key={tab}
            onClick={() => updateState({ activeTab: tab as TableType, isAddEditPopupOpen: false, editData: null })}
            className={`px-4 py-2 rounded-md cursor-pointer font-semibold transition-colors duration-200
              ${
                state.activeTab === tab
                  ? 'bg-blue-800 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {tab === 'times' && 'Time'}
            {tab === 'majors' && 'Major'}
            {tab === 'technologies' && 'Technology'}
            {tab === 'impacts' && 'Impact'}
            {tab === 'outlines' && 'Discussion Suggestions'}
          </button>
        ))}
        <button
          onClick={() => updateState({ isAddEditPopupOpen: true, editData: null })}
          className="bg-blue-400 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-yellow-400 flex items-center gap-2 text-lg transition-colors duration-200"
        >
          <FaPlus /> Add
        </button>
      </div>

      <AdminTable
        data={state.data}
        table={state.activeTab}
        onEdit={(item) => updateState({ editData: item, isAddEditPopupOpen: true })}
        onDelete={handleDeleteClick}
      />

      {state.activeTab !== 'outlines' ? (
        <AddEditCardForm
          isOpen={state.isAddEditPopupOpen}
          onClose={() => updateState({ isAddEditPopupOpen: false, editData: null })}
          onSave={(newData: ICardFormData) =>
            handleSave(newData, () => updateState({ isAddEditPopupOpen: false, editData: null }))
          }
          initialData={state.editData as ICardFormData | null}
          table={state.activeTab as Exclude<TableType, 'outlines'>}
        />
      ) : (
        <AddEditSuggestForm
          isOpen={state.isAddEditPopupOpen}
          onClose={() => updateState({ isAddEditPopupOpen: false, editData: null })}
          onSave={(newData: ISuggestData) =>
            handleSave(newData, () => updateState({ isAddEditPopupOpen: false, editData: null }))
          }
          initialData={state.editData as ISuggestData | null}
        />
      )}
    </div>
  );
}
