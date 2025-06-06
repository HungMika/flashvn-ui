import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cyber`;

//[GET] all question by subjectId
export const getQuestions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/allQuiz`);
      return res.data;
    } catch (error) {
      console.error('Error reading questions:', error);
      return [];
    }
};

export const getQuizByTopic = async (topicName: string) => {
  try {
    const endpoint =
      topicName === 'all'
        ? `${BASE_URL}/allQuiz`
        : `${BASE_URL}/getQuizByTopic?topic=${encodeURIComponent(topicName)}`;

    const res = await axios.get(endpoint);
    return res.data;
  } catch (error) {
    console.error('Error fetching quizzes by topic:', error);
    return [];
  }
};

export const createQuiz = async ({
  topic,
  question,
  rightAnswer,
  answers,
}: {
  topic: string;
  question: string;
  rightAnswer: string;
  answers: string[];
}) => {
  try {
    const res = await axios.post(`${BASE_URL}/createQuiz`, {
      topic,
      question: question.trim(),
      rightAnswer,
      answers,
    });
    return res.data;
  } catch (error: any) {
    console.error('Error creating quiz:', error);
    throw error;
  }
};

export const deleteQuiz = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/removeQuiz/${id}`);
    return res.data;
  } catch (error: any) {
    console.error('Error deleting quiz:', error);
    throw error;
  }
};

export const editQuiz = async ({
  id,
  topic,
  question,
  rightAnswer,
  answers,
}: {
  id: string;
  topic: string;
  question: string;
  rightAnswer: string;
  answers: string[];
}) => {
  try {
    const res = await axios.put(`${BASE_URL}/editQuiz/${id}`, {
      topic,
      question: question.trim(),
      rightAnswer: rightAnswer.trim(),
      answers: answers.map((a) => a.trim()),
    });
    return res.data;
  } catch (error: any) {
    console.error('Error editing quiz:', error);
    throw error; 
  }
};