import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cyber`;

//[GET] all question by subjectId
export const getTopics = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/allTopics`);
      return res.data;
    } catch (error) {
      console.error('Error reading topics:', error);
      return [];
    }
};

export const createTopic = async (topicName: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/createTopic`, {
      topicName,
    });
    return res.data;
  } catch (error) {
    console.error('Error creating topic:', error);
    throw error;
  }
};

export const deleteTopic = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/removeTopic/${id}`);
    return res.data;
  } catch (error: any) {
    console.error('Error deleting topic:', error);
    throw error;
  }
};

export const editTopic = async (id: string, newTopicName: string) => {
  try {
    const res = await axios.put(`${BASE_URL}/editTopic/${id}`, {
      topicName: newTopicName.trim(),
    });
    return res.data;
  } catch (error: any) {
    console.error('Error editing topic:', error);
    throw error;
  }
};