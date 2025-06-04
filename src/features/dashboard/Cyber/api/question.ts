import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cyber`;

//[GET] all question by subjectId
export const getQuestions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/allQuestions`);
      return res.data;
    } catch (error) {
      console.error('Error reading questions:', error);
      return [];
    }
};