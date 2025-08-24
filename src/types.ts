export type Role = 'wholesale_bank' | 'fintech' | 'big_tech' | 'crypto';
export type Tier = 'best' | 'b' | 'c';

export interface Option {
  id: string;
  role: Role;
  tier: Tier;
  label: string;
  description?: string;
}

export interface Round {
  id: string;
  ordinal: number;
  title: string;
  shock_summary: string;
  rank_order: Role[];  // index 0..3 = ranks #1..#4
  options: Option[];   // 12 total (3 per role)
}

export interface Choice {
  roundId: string;
  optionId: string;
  tier: Tier;
  points: number;
}

export interface GameState {
  chosenRole?: Role;
  currentRoundIdx: number;   // 0..3
  totalPoints: number;
  choices: Choice[];
  completed: boolean;
}
