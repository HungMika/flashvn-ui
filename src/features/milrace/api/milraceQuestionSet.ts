import axios from '@/lib/axios';
import { ApiResponse, MilraceQuestionSet } from '@/types/milrace';

// [GET] /milraceQuestion
export const getAllMilraceQuestionSets = async (): Promise<ApiResponse<MilraceQuestionSet[]>> => {
  const res = await axios.get('/milrace/milraceQuestion');
  return res.data; // { success, message, data: MilraceQuestionSet[] }
};

// [GET] /milraceQuestion/:id
export const getMilraceQuestionSetById = async (id: string): Promise<ApiResponse<MilraceQuestionSet>> => {
  const res = await axios.get(`/milrace/milraceQuestion/${id}`);
  return res.data; // { success, message, data: MilraceQuestionSet }
};

// [POST] /milraceQuestion
export const createMilraceQuestionSet = async (
  payload: MilraceQuestionSet,
): Promise<ApiResponse<MilraceQuestionSet>> => {
  const res = await axios.post('/milrace/milraceQuestion', payload);
  return res.data; // { success, message, data: MilraceQuestionSet }
};

// [PUT] /milraceQuestion/:id
export const updateMilraceQuestionSet = async (
  id: string,
  payload: Partial<MilraceQuestionSet>,
): Promise<ApiResponse<MilraceQuestionSet>> => {
  const res = await axios.put(`/milrace/milraceQuestion/${id}`, payload);
  return res.data; // { success, message, data: MilraceQuestionSet }
};

// [DELETE] /milraceQuestion/:id
export const deleteMilraceQuestionSet = async (id: string): Promise<ApiResponse<{ message: string }>> => {
  const res = await axios.delete(`/milrace/milraceQuestion/${id}`);
  return res.data; // { success, message, data: { message: string } }
};
