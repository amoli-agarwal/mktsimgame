import type { Tier, Role } from './types';

export function pointsFor(tier: Tier, roleRankIndex: number): number {
  if (tier === 'best') return [6, 5, 4, 3][roleRankIndex]; // #1..#4
  if (tier === 'b') return 2;
  return 1; // 'c'
}

export function rankIndexFor(role: Role, rankOrder: Role[]): number {
  const i = rankOrder.indexOf(role);
  return i >= 0 ? i : 0;
}
