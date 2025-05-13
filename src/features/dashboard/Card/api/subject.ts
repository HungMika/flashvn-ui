//flashvn-ui\src\features\dashboard\Card\api\subject.ts
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/card/subjects`;

//[GET] by group
export const getSubjectByGroup = async (group: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}`, {params: { group }},
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching subjects by group:', error);
    return [];
  }
};

//[GET] by id
export const getSubjectById = async (id: string) => {
  try {
    const res = await axios.get( `${BASE_URL}/${id}` );
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch subjects by user');
  }
};

//[POST] search subjects
export const searchSubjects = async (title: string, group: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/search`,
      { title, group },
      { withCredentials: true },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//[POST] create subjects
export const createSubject = async (title: string, group: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}`,
      { title, group },
      { withCredentials: true },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//[PATCH] update subjects
export const updateSubject = async (
  subjectId: string,
  title: string,
  group: string,
) => {
  try {
    console.log('PATCH to:', `${BASE_URL}/${subjectId}`);
    console.log('Data:', { title, group });
    const res = await axios.patch(
      `${BASE_URL}/${subjectId}`,
      { title, group },
      { withCredentials: true },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//[DELETE] subjectS 
export const deleteSubject = async (subjectId: string) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/${subjectId}`,
      {withCredentials: true,},
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};