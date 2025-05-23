export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

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

export type PlayerHistoryData = {
  name: string;
  index: number;
  position: number;
  answered: number;
  correctAnswers: number;
};

export type MilraceQuestion = {
  index: number;
  question: string;
  choices: Record<string, string>; // { A: "...", B: "...", ... }
  ans: string;
  _id?: string;
};

export type MilraceQuestionSet = {
  _id?: string;
  title: string;
  questions: MilraceQuestion[];
  createdAt?: string;
  updatedAt?: string;
};

export interface Player extends PlayerHistoryData {
  index: number;
  position: number;
  name: string;
  answered: number;
  correctAnswers: number;
}

export interface Question {
  question: string;
  choices: { [key: string]: string };
  ans: string;
}
