import {
  FightPick,
  FightPickWithScore,
  FightResult,
} from '@fight-picks/models';
import { NormalizedFights } from '@fight-picks/native-data-access';

import { calculatePickScore } from './calculate-pick-score';

/**
 *
 * @param fightPick
 * @param fightResult
 * @returns fightPickWithScore A FightPick with the score field calculated.
 */
export const addScoreToFightPick = (
  fightPick: FightPick,
  fightResult?: FightResult,
): FightPickWithScore => {
  const score = calculatePickScore(fightPick, fightResult);
  return {
    ...fightPick,
    score,
  };
};

/**
 *
 * @param fightPicks
 * @param normalizedFights
 * @returns fightPicksWithScore A array of FightPicks with the score field calculated.
 */
export const addScoresToFightPicks = (
  fightPicks: FightPick[],
  normalizedFights: NormalizedFights,
): FightPickWithScore[] =>
  fightPicks.map(fightPick => {
    const fightResult = normalizedFights.get(fightPick.fightId)?.result;
    return addScoreToFightPick(fightPick, fightResult);
  });

export const addScoreToFightPicks = (
  fightPicks: FightPick[],
  fightResult?: FightResult,
): FightPickWithScore[] =>
  fightPicks.map(fightPick => {
    return addScoreToFightPick(fightPick, fightResult);
  });
