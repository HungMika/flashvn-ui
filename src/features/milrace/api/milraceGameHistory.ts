import axios from '@/lib/axios';

export type MilraceGameHistory = {
  _id?: string;
  questionSetTitle: string;
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  player5: string;
  createdAt?: string;
  updatedAt?: string;
};

// [GET] /milraceGameHistory
export const getAllMilraceGameHistories = async (): Promise<MilraceGameHistory[]> => {
  const res = await axios.get('/milrace/milraceGameHistory');
  return res.data;
};

// [POST] /milraceMilraceGameHistory
type PlayerHistoryData = {
  name: string;
  index: number;
  position: number;
  answered: number;
  correctAnswers: number;
};

export const createMilraceGameHistory = async (
  questionSetTitle: string,
  players: PlayerHistoryData[],
): Promise<{ message: string }> => {
  const res = await axios.post('/milrace/milraceGameHistory', {
    questionSetTitle,
    players,
  });
  return res.data;
};
