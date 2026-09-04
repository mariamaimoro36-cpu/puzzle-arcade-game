import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  unlocked: boolean;
  points: number;
}

export interface PowerUp {
  id: string;
  name: string;
  type: 'multiplier' | 'shield' | 'slowtime' | 'bomb' | 'heal';
  duration: number;
  value: number;
  active: boolean;
}

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  objective: string;
  targetScore: number;
  reward: number;
  completed: boolean;
  progress: number;
}

export interface GameEnhancementState {
  // Achievements
  achievements: Achievement[];
  totalAchievementPoints: number;
  unlockedAchievementsCount: number;

  // Power-ups
  activePowerUps: PowerUp[];
  powerUpInventory: Record<string, number>;

  // Daily Challenges
  dailyChallenges: DailyChallenge[];
  completedChallengesCount: number;
  totalChallengeRewards: number;

  // Streaks
  currentStreak: number;
  maxStreak: number;
  lastPlayDate: string | null;

  // Actions
  unlockAchievement: (achievementId: string) => void;
  activatePowerUp: (powerUpId: string) => void;
  deactivatePowerUp: (powerUpId: string) => void;
  addPowerUpToInventory: (powerUpId: string, quantity: number) => void;
  updateDailyChallengeProgress: (challengeId: string, progress: number) => void;
  completeDailyChallenge: (challengeId: string) => void;
  updateStreak: (date: string) => void;
  initializeDailyChallenges: () => void;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_game',
    name: 'Getting Started',
    description: 'Play your first game',
    icon: '🎮',
    unlocked: false,
    points: 10,
  },
  {
    id: 'score_100',
    name: 'Century Club',
    description: 'Reach a score of 100 points',
    icon: '💯',
    unlocked: false,
    points: 25,
  },
  {
    id: 'score_500',
    name: 'High Roller',
    description: 'Reach a score of 500 points',
    icon: '🎰',
    unlocked: false,
    points: 50,
  },
  {
    id: 'score_1000',
    name: 'Legend',
    description: 'Reach a score of 1000 points',
    icon: '👑',
    unlocked: false,
    points: 100,
  },
  {
    id: 'games_10',
    name: 'Persistent Player',
    description: 'Play 10 games',
    icon: '🔄',
    unlocked: false,
    points: 20,
  },
  {
    id: 'games_50',
    name: 'Hardcore Gamer',
    description: 'Play 50 games',
    icon: '🎯',
    unlocked: false,
    points: 75,
  },
  {
    id: 'perfect_game',
    name: 'Perfect Game',
    description: 'Score without any mistakes',
    icon: '⭐',
    unlocked: false,
    points: 150,
  },
  {
    id: 'streak_7',
    name: 'Weekly Warrior',
    description: 'Maintain a 7-day play streak',
    icon: '🔥',
    unlocked: false,
    points: 60,
  },
  {
    id: 'all_modes',
    name: 'Mode Master',
    description: 'Play all three game modes',
    icon: '🎪',
    unlocked: false,
    points: 40,
  },
  {
    id: 'speedrun',
    name: 'Speed Demon',
    description: 'Complete a game in under 30 seconds',
    icon: '⚡',
    unlocked: false,
    points: 80,
  },
];

const DEFAULT_POWER_UPS: PowerUp[] = [
  {
    id: 'multiplier_2x',
    name: '2x Score Multiplier',
    type: 'multiplier',
    duration: 30000,
    value: 2,
    active: false,
  },
  {
    id: 'multiplier_3x',
    name: '3x Score Multiplier',
    type: 'multiplier',
    duration: 15000,
    value: 3,
    active: false,
  },
  {
    id: 'shield',
    name: 'Shield',
    type: 'shield',
    duration: 20000,
    value: 1,
    active: false,
  },
  {
    id: 'slowtime',
    name: 'Slow Time',
    type: 'slowtime',
    duration: 25000,
    value: 0.5,
    active: false,
  },
  {
    id: 'bomb',
    name: 'Bomb Blast',
    type: 'bomb',
    duration: 5000,
    value: 500,
    active: false,
  },
];

export const useGameEnhancementStore = create<GameEnhancementState>()(
  persist(
    (set, get) => ({
      achievements: DEFAULT_ACHIEVEMENTS,
      totalAchievementPoints: 0,
      unlockedAchievementsCount: 0,

      activePowerUps: [],
      powerUpInventory: {
        'multiplier_2x': 3,
        'multiplier_3x': 1,
        'shield': 2,
        'slowtime': 2,
        'bomb': 1,
      },

      dailyChallenges: [],
      completedChallengesCount: 0,
      totalChallengeRewards: 0,

      currentStreak: 0,
      maxStreak: 0,
      lastPlayDate: null,

      unlockAchievement: (achievementId: string) => {
        set((state) => {
          const achievement = state.achievements.find((a) => a.id === achievementId);
          if (!achievement || achievement.unlocked) return state;

          const updatedAchievements = state.achievements.map((a) =>
            a.id === achievementId ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
          );

          return {
            achievements: updatedAchievements,
            totalAchievementPoints: state.totalAchievementPoints + achievement.points,
            unlockedAchievementsCount: state.unlockedAchievementsCount + 1,
          };
        });
      },

      activatePowerUp: (powerUpId: string) => {
        set((state) => {
          const powerUp = DEFAULT_POWER_UPS.find((p) => p.id === powerUpId);
          if (!powerUp) return state;

          const inventory = state.powerUpInventory[powerUpId] || 0;
          if (inventory <= 0) return state;

          return {
            activePowerUps: [...state.activePowerUps, { ...powerUp, active: true }],
            powerUpInventory: {
              ...state.powerUpInventory,
              [powerUpId]: inventory - 1,
            },
          };
        });
      },

      deactivatePowerUp: (powerUpId: string) => {
        set((state) => ({
          activePowerUps: state.activePowerUps.filter((p) => p.id !== powerUpId),
        }));
      },

      addPowerUpToInventory: (powerUpId: string, quantity: number) => {
        set((state) => ({
          powerUpInventory: {
            ...state.powerUpInventory,
            [powerUpId]: (state.powerUpInventory[powerUpId] || 0) + quantity,
          },
        }));
      },

      updateDailyChallengeProgress: (challengeId: string, progress: number) => {
        set((state) => ({
          dailyChallenges: state.dailyChallenges.map((c) =>
            c.id === challengeId ? { ...c, progress: Math.min(progress, c.targetScore) } : c
          ),
        }));
      },

      completeDailyChallenge: (challengeId: string) => {
        set((state) => {
          const challenge = state.dailyChallenges.find((c) => c.id === challengeId);
          if (!challenge || challenge.completed) return state;

          return {
            dailyChallenges: state.dailyChallenges.map((c) =>
              c.id === challengeId ? { ...c, completed: true } : c
            ),
            completedChallengesCount: state.completedChallengesCount + 1,
            totalChallengeRewards: state.totalChallengeRewards + challenge.reward,
          };
        });
      },

      updateStreak: (date: string) => {
        set((state) => {
          if (!state.lastPlayDate) {
            return { currentStreak: 1, maxStreak: 1, lastPlayDate: date };
          }

          const lastDate = new Date(state.lastPlayDate);
          const currentDate = new Date(date);
          const dayDiff = Math.floor(
            (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (dayDiff === 1) {
            const newStreak = state.currentStreak + 1;
            return {
              currentStreak: newStreak,
              maxStreak: Math.max(newStreak, state.maxStreak),
              lastPlayDate: date,
            };
          } else if (dayDiff > 1) {
            return { currentStreak: 1, lastPlayDate: date };
          }

          return state;
        });
      },

      initializeDailyChallenges: () => {
        const today = new Date().toISOString().split('T')[0];
        const challenges: DailyChallenge[] = [
          {
            id: `challenge_score_${today}`,
            date: today,
            title: 'Score Master',
            description: 'Earn 300 points in a single game',
            objective: 'Reach 300 points',
            targetScore: 300,
            reward: 50,
            completed: false,
            progress: 0,
          },
          {
            id: `challenge_mode_${today}`,
            date: today,
            title: 'Mode Challenge',
            description: 'Complete all three game modes',
            objective: 'Play Puzzle, Arcade, and Survival',
            targetScore: 3,
            reward: 75,
            completed: false,
            progress: 0,
          },
          {
            id: `challenge_speedrun_${today}`,
            date: today,
            title: 'Speed Runner',
            description: 'Complete a game in under 45 seconds',
            objective: 'Fast completion',
            targetScore: 45,
            reward: 60,
            completed: false,
            progress: 0,
          },
        ];

        set({ dailyChallenges: challenges });
      },
    }),
    {
      name: 'game-enhancement-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
