import { FightPick, FightPickWithScore } from '@fight-picks/models';
import { NormalizedFights } from '@fight-picks/native-data-access';
import { FightResultsScoreMap } from './fight-result-score-map';

/**
 *
 * @param fightPick
 * @param fightResult
 * @returns fightPickWithScore A FightPick with the score field calculated.
 */
export const addScoreToFightPick = (
  fightPick: FightPick,
  fightResultCode: string | null,
): FightPickWithScore => {
  if (fightResultCode === null)
    return {
      ...fightPick,
      score: undefined,
    };
  const score = FightResultsScoreMap[fightResultCode][fightPick.resultCode];
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
    const fightResultCode =
      normalizedFights.get(fightPick.fightId)?.resultCode ?? null;
    return addScoreToFightPick(fightPick, fightResultCode);
  });

export const addScoreToFightPicks = (
  fightPicks: FightPick[],
  fightResultCode: string | null,
): FightPickWithScore[] =>
  fightPicks.map(fightPick => {
    return addScoreToFightPick(fightPick, fightResultCode);
  });
