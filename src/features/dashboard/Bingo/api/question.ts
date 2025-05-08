//flashvn-ui\src\features\dashboard\Bingo\api\question.ts
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// [GET] /bingo/modules/:moduleId/questions
export const getQuestionsByModule = async (moduleId: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/bingo/modules/${moduleId}/questions`,
      { withCredentials: true }
    );

    const data = res.data;

    if (Array.isArray(data)) {
      return { questions: data };
    } else if (Array.isArray(data.questions)) {
      return { questions: data.questions };
    } else {
      return { questions: [] };
    }
  } catch (error) {
    return { questions: [] };
  }
};

// [GET] /bingo/questions/:id
export const getQuestionById = async (questionId: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/bingo/questions/${questionId}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

// [POST] /bingo/modules/:moduleId/questions
export const createQuestion = async (
  moduleId: string,
  questionData: {
    title: string;
    keyword: string;
    correctAnswer: string;
    wrongAnswers: string[];
  }
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/bingo/modules/${moduleId}/questions`,
      questionData,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw new Error('Failed to create question');
  }
};

// [PATCH] /bingo/questions/:id
export const updateQuestion = async (
  questionId: string,
  updateData: {
    title: string;
    keyword: string;
    correctAnswer: string;
    wrongAnswers: string[];
  }
) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/bingo/questions/${questionId}`,
      updateData,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw new Error('Failed to update question');
  }
};

// [DELETE] /bingo/questions/:id
export const deleteQuestion = async (questionId: string) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/bingo/questions/${questionId}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw new Error('Failed to delete question');
  }
};

// [POST] /bingo/questions/search
export const searchQuestions = async (query: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/bingo/questions/search`,
      { query },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return [];
  }
};
