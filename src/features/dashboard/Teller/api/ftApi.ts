import axios from 'axios';
import { ICardData, ISuggestData } from '@/features/dashboard/Teller/components/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api/future-teller';

const ftApi = axios.create({
  baseURL: API_BASE_URL,
});

ftApi.interceptors.request.use(
  (config) => {
    // Không gửi token cho các API công khai
    if (
      config.method === 'get' &&
      (config.url?.includes('/cards/group') || config.url?.includes('/suggests/'))
    ) {
      return config;
    }
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ftApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Đã xảy ra lỗi';
    switch (error.response?.status) {
      case 400:
        throw new Error(`Dữ liệu không hợp lệ: ${message}`);
      case 401:
        throw new Error('Vui lòng đăng nhập lại');
      case 404:
        return { data: [] }; // Trả về mảng rỗng cho 404
      case 409:
        throw new Error(`Dữ liệu đã tồn tại: ${message}`);
      default:
        throw new Error(`Lỗi máy chủ: ${message}`);
    }
  }
);

export const ftCardApi = {
  getAllByGroup: async (group: string): Promise<ICardData[]> => {
    const response = await ftApi.get(`/cards/group?query=${group}`);
    return response.data;
  },
  getById: async (id: string): Promise<ICardData> => {
    const response = await ftApi.get(`/cards/${id}`);
    return response.data;
  },
  create: async (cardData: FormData): Promise<ICardData> => {
    const response = await ftApi.post('/cards/', cardData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  update: async (id: string, cardData: FormData): Promise<ICardData> => {
    const response = await ftApi.patch(`/cards/${id}`, cardData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await ftApi.delete(`/cards/${id}`);
  },
};

export const ftSuggestApi = {
  getAll: async (): Promise<ISuggestData[]> => {
    const response = await ftApi.get('/suggests/');
    return response.data;
  },
  getById: async (id: string): Promise<ISuggestData> => {
    const response = await ftApi.get(`/suggests/${id}`);
    return response.data;
  },
  create: async (suggestData: ISuggestData): Promise<ISuggestData> => {
    const response = await ftApi.post('/suggests/', suggestData);
    return response.data;
  },
  update: async (id: string, suggestData: ISuggestData): Promise<ISuggestData> => {
    const response = await ftApi.patch(`/suggests/${id}`, suggestData);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await ftApi.delete(`/suggests/${id}`);
  },
};