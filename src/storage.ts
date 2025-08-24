import type { GameState } from './types';
const KEY = 'fintech-sim-state';

export const loadState = (): GameState | null => {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
  catch { return null; }
};

export const saveState = (s: GameState) => {
  localStorage.setItem(KEY, JSON.stringify(s));
};

export const newState = (): GameState => ({
  currentRoundIdx: 0,
  totalPoints: 0,
  choices: [],
  completed: false,
});
