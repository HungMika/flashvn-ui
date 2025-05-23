import axios from '@/lib/axios';

export type MilraceQuestion = {
  index: number;
  question: string;
  choices: Record<string, string>; // { A: "...", B: "...", ... }
  ans: string;
  _id?: string;
};

export type MilraceQuestionSet = {
  _id?: string;
  title: string;
  questions: MilraceQuestion[];
  createdAt?: string;
  updatedAt?: string;
};

// [GET] /milraceQuestion
export const getAllMilraceQuestionSets = async (): Promise<MilraceQuestionSet[]> => {
  const res = await axios.get('/milrace/milraceQuestion');
  return res.data;
};

// [GET] /milraceQuestion/:id
export const getMilraceQuestionSetById = async (id: string): Promise<MilraceQuestionSet> => {
  const res = await axios.get(`/milrace/milraceQuestion/${id}`);
  return res.data;
};

// [POST] /milraceQuestion
export const createMilraceQuestionSet = async (payload: MilraceQuestionSet): Promise<MilraceQuestionSet> => {
  const res = await axios.post('/milrace/milraceQuestion', payload);
  return res.data;
};

// [PUT] /milraceQuestion/:id
export const updateMilraceQuestionSet = async (
  id: string,
  payload: Partial<MilraceQuestionSet>,
): Promise<MilraceQuestionSet> => {
  const res = await axios.put(`/milrace/milraceQuestion/${id}`, payload);
  return res.data;
};

// [DELETE] /milraceQuestion/:id
export const deleteMilraceQuestionSet = async (id: string): Promise<{ message: string }> => {
  const res = await axios.delete(`/milrace/milraceQuestion/${id}`);
  return res.data;
};
