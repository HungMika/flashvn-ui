//flashvn-ui\src\features\dashboard\Bingo\api\module.ts
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/bingo/modules`;

// [GET] /bingo/modules
export const getAllModules = async () => {
  console.log("🔥 getAllModules CALLED");
  try {
    const res = await axios.get(BASE_URL, { withCredentials: true });
    console.log("🔍 BASE_URL:", BASE_URL);

    console.log("📡 GET Success", res.data);
    console.log("✅ res.data type:", typeof res.data);
    console.log("✅ isArray:", Array.isArray(res.data));
    console.log("✅ full res.data:", res.data);


    if (Array.isArray(res.data)) {
      return res.data;
    } else {
      console.warn("⚠️ Not array:", res.data);
      return [];
    }
  } catch (error: any) {
    console.error("❌ GET Error", error?.response?.data || error);
    return [];
  }
};



// [GET] /bingo/modules/:id
export const getModuleById = async (moduleId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/${moduleId}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// [POST] /bingo/modules/search
export const searchModules = async (query: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/search`, { query }, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// [POST] /bingo/modules
export const createModule = async (title: string, keywords: string[]) => {
  try {
    const res = await axios.post(BASE_URL, { title, keywords }, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// [PATCH] /bingo/modules/:id
export const updateModule = async (moduleId: string, title: string, keywords: string[]) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${moduleId}`, { title, keywords }, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// [DELETE] /bingo/modules/:id
export const deleteModule = async (moduleId: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${moduleId}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
