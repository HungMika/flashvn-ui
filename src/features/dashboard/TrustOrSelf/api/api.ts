import axios from 'axios';
import { Question, QuestionWithCounts } from '@/features/dashboard/TrustOrSelf/components/types';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/trust-or-self`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAllQuestions = async (): Promise<QuestionWithCounts[]> => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy danh sách câu hỏi:', error);
    throw error;
  }
};

export const fetchQuestionById = async (id: string): Promise<QuestionWithCounts> => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy câu hỏi:', error);
    throw error;
  }
};

export const createQuestion = async (content: string): Promise<QuestionWithCounts> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Không tìm thấy token');
    const response = await api.post('/', { content }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi tạo câu hỏi:', error);
    throw error;
  }
};

export const updateQuestion = async (id: string, content: string): Promise<QuestionWithCounts> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Không tìm thấy token');
    const response = await api.patch(`/${id}`, { content }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi sửa câu hỏi:', error);
    throw error;
  }
};

export const deleteQuestion = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Không tìm thấy token');
    await api.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Lỗi xóa câu hỏi:', error);
    throw error;
  }
};

export const incrementTrustCount = async (id: string): Promise<QuestionWithCounts> => {
  try {
    const response = await api.patch(`/trust/count/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi tăng trustCount:', error);
    throw error;
  }
};

export const incrementSelfCount = async (id: string): Promise<QuestionWithCounts> => {
  try {
    const response = await api.patch(`/self/count/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi tăng selfCount:', error);
    throw error;
  }
};

export const resetCounts = async (id: string): Promise<QuestionWithCounts> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Không tìm thấy token');
    const response = await api.patch(`/${id}/reset`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi reset trustCount và selfCount:', error);
    throw error;
  }
};