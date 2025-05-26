export interface Question {
  _id: string;
  content: string;
}

export interface QuestionWithCounts extends Question {
  trustCount: number;
  selfCount: number;
}

export interface Result {
  percentage: number;
  choice: 'trust' | 'self';
}