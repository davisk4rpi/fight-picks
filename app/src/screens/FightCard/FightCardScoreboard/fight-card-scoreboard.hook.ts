import { useMemo } from 'react';

import { FightPick, FightPickWithScore } from '@fight-picks/models';
import {
  NormalizedFights,
  useFightPicksByFightIds,
  useSelectNormalizedFightsByIds,
} from '@fight-picks/native-data-access';
import { insertValueInOrderedArray } from '@fight-picks/utilities';

import { calculatePickScore } from '../../../libs/scoring';

export const useFightCardScoreboard = (fightIds: string[]) => {
  const { fightPicks, loading } = useFightPicksByFightIds(fightIds);
  const normalizedFights = useSelectNormalizedFightsByIds(fightIds);

  const fightPicksWithScores = useMemo(
    () => scorePicks(fightPicks, normalizedFights),
    [fightPicks, normalizedFights],
  );
  const userScoresMap = useMemo(
    () => mapTotalScoreToUid(fightPicksWithScores),
    [fightPicksWithScores],
  );
  const scores = useMemo(
    () => convertUserScoreMapToOrderedArray(userScoresMap),
    [userScoresMap],
  );
  return {
    scores,
    fightPicksLoading: loading,
  };
};

const scorePicks = (
  fightPicks: FightPick[],
  normalizedFights: NormalizedFights,
): FightPickWithScore[] =>
  fightPicks.map(fightPick => {
    const fightResult = normalizedFights.get(fightPick.fightId)?.result;
    const score = calculatePickScore(fightPick, fightResult);
    return {
      ...fightPick,
      score,
    };
  });

type UidScore = { userUid: string; score: number; confidence: number };
type UidScoreMap = Map<string, UidScore>;

const mapTotalScoreToUid = (fightPicks: FightPickWithScore[]) =>
  fightPicks.reduce<UidScoreMap>((map, { userUid, score, confidence }) => {
    if (score === undefined) return map;
    const existing = map.get(userUid);
    if (existing === undefined) {
      map.set(userUid, {
        userUid,
        score,
        confidence,
      });
    } else {
      map.set(userUid, {
        userUid,
        score: existing.score + score,
        confidence: existing.confidence + confidence,
      });
    }
    return map;
  }, new Map());

const convertUserScoreMapToOrderedArray = (map: UidScoreMap) => {
  const arr: UidScore[] = [];
  for (let entry of map) {
    const [, uidScore] = entry;
    // TODO abstract comparisonFunc into a utility for ordering pick scores
    insertValueInOrderedArray(uidScore, arr, (target, existing) => {
      if (target.score > existing.score) {
        return -1;
      } else if (target.score < existing.score) {
        return 1;
      } else {
        if (target.confidence > existing.confidence) {
          return target.score === 0 ? 1 : -1;
        } else if (target.confidence < existing.confidence) {
          return target.score === 0 ? -1 : 1;
        } else {
          return 0;
        }
      }
    });
  }
  return arr;
};
