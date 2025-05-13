// flashvn-ui/src/features/dashboard/Card/api/question.ts
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/card`;

//[GET] all question by subjectId
export const getQuestionsBySubject = async (subjectId: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/subjects/${subjectId}/questions`);
      return res.data;
    } catch (error) {
      return [];
    }
  };

//[GET] question detail by questionid
export const getQuestionById = async (questionId: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/questions/${questionId}`);
      return res.data;
    } catch (error) {
      throw new Error('Failed to fetch question by ID');
    }
  };
  
  //[POST] create question
  export const createQuestion = async (
    subjectId: string,
    questionData: {
      title: string;
      correctAnswer: string;
      wrongAnswers: string[];
    },
  ) => {
    try {
      const res = await axios.post(`${BASE_URL}/subjects/${subjectId}/questions`,
        questionData,
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      throw new Error('Failed to create question');
    }
  };
  
  //[PATCH] update question
  export const updateQuestion = async (
    questionId: string,
    updateData: {
      title: string;
      correctAnswer?: string;
      wrongAnswers?: string[];
    },
  ) => {
    try {
      const res = await axios.patch(`${BASE_URL}/questions/${questionId}`,
        updateData,
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      throw new Error('Failed to update question');
    }
  };
  
  //[DELETE] question
  export const deleteQuestion = async (questionId: string) => {
    try {
      const res = await axios.delete(`${BASE_URL}/questions/${questionId}`,
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      throw new Error('Failed to delete question');
    }
  };

//[POST] search questions by subjectId
export const searchQuestions = async (subjectId: string, query: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/questions/search/${subjectId}`,
        { query },
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };