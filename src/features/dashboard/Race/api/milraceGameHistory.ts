import axios from '@/lib/axios';
import { ApiResponse, MilraceGameHistory, PlayerHistoryData } from '@/types/milrace';

// [GET] /milraceGameHistory
export const getAllMilraceGameHistories = async (): Promise<ApiResponse<MilraceGameHistory[]>> => {
  const res = await axios.get('/milrace/milraceGameHistory');
  return res.data; // { success, message, data: MilraceGameHistory[] }
};

// [POST] /milraceGameHistory
export const createMilraceGameHistory = async (
  questionSetTitle: string,
  players: PlayerHistoryData[],
): Promise<ApiResponse<{ message: string }>> => {
  const res = await axios.post('/milrace/milraceGameHistory', {
    questionSetTitle,
    players,
  });
  return res.data; // { success, message, data: { message: string } }
};
