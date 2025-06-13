import axios from 'axios';
import { ICardData, ISuggestData } from '@/features/dashboard/Teller/components/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const ftApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

ftApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const ftCardApi = {
  getAllByGroup: async (group: string): Promise<ICardData[]> => {
    if (!group?.trim()) return [];
    try {
      const response = await ftApi.get(`/future-teller/cards/group?query=${group}`);
      console.log('API DATA:', response.data); 
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return [];
    } catch (error: any) {
      throw error;
    }
  },

  getCardById: async (id: string): Promise<ICardData> => {
    try {
      const response = await ftApi.get(`/future-teller/cards/${id}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  createCard: async (data: { title: string; group: string; image: File }): Promise<ICardData> => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('group', data.group);
      formData.append('image', data.image);
      const response = await ftApi.post('/future-teller/cards', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message === 'Future Teller card already exists!') {
        throw new Error('Thẻ đã tồn tại với thông tin này!');
      }
      throw error;
    }
  },

  updateCard: async (id: string, data: { title: string; group: string; image?: File }): Promise<ICardData> => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('group', data.group);
      if (data.image) formData.append('image', data.image);
      const response = await ftApi.patch(`/future-teller/cards/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message === 'Future Teller card already exists!') {
        throw new Error('Thẻ đã tồn tại với thông tin này!');
      }
      throw error;
    }
  },

  deleteCard: async (id: string): Promise<void> => {
    try {
      await ftApi.delete(`/future-teller/cards/${id}`);
    } catch (error: any) {
      throw error;
    }
  },
};

export const ftSuggestApi = {
  getAll: async (): Promise<ISuggestData[]> => {
    try {
      const response = await ftApi.get('/future-teller/suggests');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  getSuggestById: async (id: string): Promise<ISuggestData> => {
    try {
      const response = await ftApi.get(`/future-teller/suggests/${id}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  createSuggest: async (data: ISuggestData): Promise<ISuggestData> => {
    try {
      const response = await ftApi.post('/future-teller/suggests', data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message === 'Future Teller suggest already exists!') {
        throw new Error('Đề xuất đã tồn tại!');
      }
      throw error;
    }
  },

  updateSuggest: async (id: string, data: ISuggestData): Promise<ISuggestData> => {
    try {
      const response = await ftApi.patch(`/future-teller/suggests/${id}`, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message === 'Future Teller suggest already exists!') {
        throw new Error('Đề xuất đã tồn tại!');
      }
      throw error;
    }
  },

  deleteSuggest: async (id: string): Promise<void> => {
    try {
      await ftApi.delete(`/future-teller/suggests/${id}`);
    } catch (error: any) {
      throw error;
    }
  },
};
