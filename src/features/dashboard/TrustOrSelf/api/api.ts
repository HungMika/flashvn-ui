import axios from 'axios';
import { QuestionWithCounts } from '@/features/dashboard/TrustOrSelf/components/types';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/trust-or-self`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchAllQuestions = async (): Promise<QuestionWithCounts[]> => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    console.error('fetchAllQuestions:', error.response?.status, error.message);
    throw error;
  }
};

export const fetchQuestionById = async (id: string): Promise<QuestionWithCounts> => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('fetchQuestionById:', error.response?.status, error.message);
    throw error;
  }
};

export const createQuestion = async (
  content: string,
  title: string,
  trustCount: number = 50,
  selfCount: number = 50
): Promise<QuestionWithCounts> => {
  try {
    const response = await api.post('/', { content, title, trustCount, selfCount });
    return response.data;
  } catch (error: any) {
    console.error('createQuestion:', error.response?.status, error.message);
    if (error.response?.data?.message === 'Title already exists') {
      throw new Error('Tiêu đề đã tồn tại');
    }
    throw error;
  }
};

export const updateQuestion = async (
  id: string,
  content: string,
  title: string,
  trustCount: number = 50,
  selfCount: number = 50
): Promise<QuestionWithCounts> => {
  try {
    const response = await api.patch(`/${id}`, { content, title, trustCount, selfCount });
    return response.data;
  } catch (error: any) {
    console.error('updateQuestion:', error.response?.status, error.message);
    throw error;
  }
};

export const deleteQuestion = async (id: string): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error: any) {
    console.error('deleteQuestion:', error.response?.status, error.message);
    throw error;
  }
};

export const incrementTrustCount = async (id: string): Promise<QuestionWithCounts> => {
  try {
    const response = await api.patch(`/trust/count/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('incrementTrustCount:', error.response?.status, error.message);
    throw error;
  }
};

export const incrementSelfCount = async (id: string): Promise<QuestionWithCounts> => {
  try {
    const response = await api.patch(`/self/count/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('incrementSelfCount:', error.response?.status, error.message);
    throw error;
  }
};