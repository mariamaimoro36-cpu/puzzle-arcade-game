/**
 * Game Utilities and Helper Functions
 * Provides common game logic, scoring, and utility functions
 */

export interface GameDifficulty {
  level: number;
  multiplier: number;
  timeLimit: number;
  targetScore: number;
}

/**
 * Get difficulty settings based on level
 */
export const getDifficultySettings = (level: number): GameDifficulty => {
  const difficulties: Record<number, GameDifficulty> = {
    1: { level: 1, multiplier: 1, timeLimit: 60, targetScore: 100 },
    2: { level: 2, multiplier: 1.25, timeLimit: 55, targetScore: 150 },
    3: { level: 3, multiplier: 1.5, timeLimit: 50, targetScore: 250 },
    4: { level: 4, multiplier: 1.75, timeLimit: 45, targetScore: 350 },
    5: { level: 5, multiplier: 2, timeLimit: 40, targetScore: 500 },
  };

  return difficulties[level] || difficulties[1];
};

/**
 * Calculate score with multiplier and bonuses
 */
export const calculateScore = (
  basePoints: number,
  level: number,
  timeBonus?: number
): number => {
  const difficulty = getDifficultySettings(level);
  const multipliedScore = Math.floor(basePoints * difficulty.multiplier);
  const bonus = timeBonus ? Math.floor(timeBonus * 0.1) : 0;
  return multipliedScore + bonus;
};

/**
 * Get score message based on points earned
 */
export const getScoreMessage = (points: number): string => {
  if (points >= 100) return '🔥 Amazing!';
  if (points >= 75) return '⭐ Great!';
  if (points >= 50) return '👍 Good!';
  if (points >= 25) return '✅ Nice!';
  return '👌 OK';
};

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format large numbers with K, M suffix
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

/**
 * Get rank based on score
 */
export const getRank = (score: number): string => {
  if (score >= 5000) return '👑 Legendary';
  if (score >= 4000) return '💎 Master';
  if (score >= 3000) return '🌟 Expert';
  if (score >= 2000) return '⚡ Advanced';
  if (score >= 1000) return '🎯 Intermediate';
  return '🌱 Beginner';
};

/**
 * Calculate average score per game
 */
export const calculateAverageScore = (totalScore: number, gamesPlayed: number): number => {
  if (gamesPlayed === 0) return 0;
  return Math.floor(totalScore / gamesPlayed);
};

/**
 * Generate a unique game session ID
 */
export const generateSessionId = (): string => {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Check if score is a new high score
 */
export const isNewHighScore = (currentScore: number, highScore: number): boolean => {
  return currentScore > highScore;
};

/**
 * Calculate performance percentage
 */
export const calculatePerformance = (score: number, targetScore: number): number => {
  if (targetScore === 0) return 0;
  return Math.min(100, Math.floor((score / targetScore) * 100));
};

/**
 * Get performance feedback
 */
export const getPerformanceFeedback = (percentage: number): string => {
  if (percentage >= 150) return '🎯 Incredible Performance!';
  if (percentage >= 100) return '⭐ Great Job!';
  if (percentage >= 75) return '👍 Good Effort!';
  if (percentage >= 50) return '💪 Keep Practicing!';
  return '🚀 Try Again!';
};

/**
 * Calculate play time in formatted string
 */
export const formatPlayTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

/**
 * Validate player name
 */
export const validatePlayerName = (name: string): { valid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Player name cannot be empty' };
  }
  if (name.length > 20) {
    return { valid: false, error: 'Player name must be less than 20 characters' };
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    return { valid: false, error: 'Player name can only contain letters, numbers, hyphens, and underscores' };
  }
  return { valid: true };
};
