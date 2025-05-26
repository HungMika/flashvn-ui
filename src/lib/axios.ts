import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types/milrace'; // hoặc nơi bạn định nghĩa

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const resData = error.response?.data as Partial<ApiResponse<unknown>>;

    const customError: ApiResponse<null> = {
      success: false,
      message: resData?.message || error.response?.statusText || 'Có lỗi xảy ra',
      data: null,
    };

    return Promise.resolve({ data: customError });
  },
);

export default instance;
