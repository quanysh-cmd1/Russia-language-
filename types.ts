
export enum GameType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  DRAG_DROP = 'DRAG_DROP',
  ERROR_DETECTION = 'ERROR_DETECTION',
  SENTENCE_COMPARISON = 'SENTENCE_COMPARISON',
  SORTING = 'SORTING',
  WORD_CONSTRUCTOR = 'WORD_CONSTRUCTOR'
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  CHALLENGING = 'CHALLENGING',
  MIXED = 'MIXED'
}

export interface Question {
  id: number;
  type: GameType;
  difficulty: Difficulty;
  question: string;
  options?: string[];
  correctAnswer: string | boolean | number;
  explanation: string;
  context?: string;
  lessonId?: string; // Link question to a specific lesson
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string; // YouTube URL
  category: string; // e.g., "Морфология", "Синтаксис"
  difficulty: Difficulty;
  grade?: number; // Grade level (5-11)
  isLocked?: boolean;
}

export interface User {
  username: string;
  role: 'STUDENT' | 'TEACHER';
  completedLessons?: string[];
}

export interface UserStats {
  totalGames: number;
  totalCorrect: number;
  highestScore: number;
  bestAccuracy: number;
  lessonsCompleted?: number;
}

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  mistakes: number;
  history: {
    questionId: number;
    isCorrect: boolean;
    userAnswer: any;
    category: string;
  }[];
}
