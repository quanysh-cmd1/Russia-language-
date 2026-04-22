// Simple database utility using localStorage for user progress tracking

export interface UserProgress {
  username: string;
  lessonsCompleted: string[];
  gameStats: {
    totalGames: number;
    totalCorrect: number;
    highestScore: number;
    bestAccuracy: number;
  };
  lastUpdated: number;
}

const DB_KEY_PREFIX = 'user_progress_';

export const Database = {
  // Get user progress
  getUserProgress: (username: string): UserProgress | null => {
    try {
      const data = localStorage.getItem(`${DB_KEY_PREFIX}${username}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading user progress:', error);
      return null;
    }
  },

  // Save user progress
  saveUserProgress: (progress: UserProgress): boolean => {
    try {
      localStorage.setItem(`${DB_KEY_PREFIX}${progress.username}`, JSON.stringify(progress));
      return true;
    } catch (error) {
      console.error('Error saving user progress:', error);
      return false;
    }
  },

  // Initialize user progress
  initializeUserProgress: (username: string): UserProgress => {
    const progress: UserProgress = {
      username,
      lessonsCompleted: [],
      gameStats: {
        totalGames: 0,
        totalCorrect: 0,
        highestScore: 0,
        bestAccuracy: 0,
      },
      lastUpdated: Date.now(),
    };
    Database.saveUserProgress(progress);
    return progress;
  },

  // Mark lesson as completed
  markLessonCompleted: (username: string, lessonId: string): void => {
    let progress = Database.getUserProgress(username);
    if (!progress) {
      progress = Database.initializeUserProgress(username);
    }
    if (!progress.lessonsCompleted.includes(lessonId)) {
      progress.lessonsCompleted.push(lessonId);
      progress.lastUpdated = Date.now();
      Database.saveUserProgress(progress);
    }
  },

  // Update game stats
  updateGameStats: (username: string, score: number, totalQuestions: number): void => {
    let progress = Database.getUserProgress(username);
    if (!progress) {
      progress = Database.initializeUserProgress(username);
    }

    const accuracy = Math.round((score / totalQuestions) * 100);
    progress.gameStats.totalGames += 1;
    progress.gameStats.totalCorrect += score;
    progress.gameStats.highestScore = Math.max(progress.gameStats.highestScore, score);
    progress.gameStats.bestAccuracy = Math.max(progress.gameStats.bestAccuracy, accuracy);
    progress.lastUpdated = Date.now();

    Database.saveUserProgress(progress);
  },

  // Get all users
  getAllUsers: (): string[] => {
    try {
      const keys = Object.keys(localStorage);
      return keys
        .filter(key => key.startsWith(DB_KEY_PREFIX))
        .map(key => key.replace(DB_KEY_PREFIX, ''));
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  },

  // Delete user progress
  deleteUserProgress: (username: string): boolean => {
    try {
      localStorage.removeItem(`${DB_KEY_PREFIX}${username}`);
      return true;
    } catch (error) {
      console.error('Error deleting user progress:', error);
      return false;
    }
  },

  // Export user data
  exportUserData: (username: string): string | null => {
    try {
      const progress = Database.getUserProgress(username);
      return progress ? JSON.stringify(progress, null, 2) : null;
    } catch (error) {
      console.error('Error exporting user data:', error);
      return null;
    }
  },
};
