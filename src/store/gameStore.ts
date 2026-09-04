import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GameState {
  // Player stats
  playerName: string;
  totalScore: number;
  highScore: number;
  gamesPlayed: number;
  totalPlayTime: number;
  
  // Current game state
  currentScore: number;
  currentLevel: number;
  isGameActive: boolean;
  gameStartTime: number | null;
  
  // Settings
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  darkMode: boolean;
  
  // Actions
  setPlayerName: (name: string) => void;
  startGame: (level: number) => void;
  endGame: (finalScore: number) => void;
  updateScore: (points: number) => void;
  resetGame: () => void;
  toggleSound: () => void;
  toggleVibration: () => void;
  toggleDarkMode: () => void;
  loadPlayerStats: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      playerName: 'Player',
      totalScore: 0,
      highScore: 0,
      gamesPlayed: 0,
      totalPlayTime: 0,
      currentScore: 0,
      currentLevel: 1,
      isGameActive: false,
      gameStartTime: null,
      soundEnabled: true,
      vibrationEnabled: true,
      darkMode: false,

      setPlayerName: (name: string) => set({ playerName: name }),

      startGame: (level: number) => {
        set({
          currentScore: 0,
          currentLevel: level,
          isGameActive: true,
          gameStartTime: Date.now(),
        });
      },

      endGame: (finalScore: number) => {
        const state = get();
        const playTime = state.gameStartTime ? (Date.now() - state.gameStartTime) / 1000 : 0;

        set((state) => ({
          isGameActive: false,
          gamesPlayed: state.gamesPlayed + 1,
          totalScore: state.totalScore + finalScore,
          totalPlayTime: state.totalPlayTime + playTime,
          highScore: Math.max(state.highScore, finalScore),
          gameStartTime: null,
        }));
      },

      updateScore: (points: number) => {
        set((state) => ({
          currentScore: state.currentScore + points,
        }));
      },

      resetGame: () => {
        set({
          currentScore: 0,
          currentLevel: 1,
          isGameActive: false,
          gameStartTime: null,
        });
      },

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleVibration: () => set((state) => ({ vibrationEnabled: !state.vibrationEnabled })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      loadPlayerStats: () => {
        // Stats are auto-loaded from persistence
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
