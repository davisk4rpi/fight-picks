import { decodeFightResult, MethodMap } from '@fight-picks/models';
import { calculatePickScore } from './calculate-pick-score';

export const buildAllFightResultCodes = () => {
  const fightResultCodes: string[] = [
    `${MethodMap.draw}-null-null`,
    `${MethodMap.no_contest}-null-null`,
    `${MethodMap.decision}-1-null`,
    `${MethodMap.decision}-2-null`,
  ];
  for (const method of [
    MethodMap.submission,
    MethodMap.knockout,
    MethodMap.disqualification,
  ]) {
    for (let round = 1; round <= 5; round++) {
      for (let fighter = 1; fighter <= 2; fighter++) {
        fightResultCodes.push(`${method}-${fighter}-${round}`);
      }
    }
  }
  return fightResultCodes;
};

type FightCodeScoreMap = Record<string, Record<string, number>>;
const buildFightResultsScoreMap = () => {
  const fightResultsCodes = buildAllFightResultCodes();
  return fightResultsCodes.reduce<FightCodeScoreMap>((map, code1) => {
    map[code1] = {};
    fightResultsCodes.forEach(code2 => {
      map[code1][code2] = calculateScoreFromResultCodes(code1, code2);
    });
    return map;
  }, {});
};

const calculateScoreFromResultCodes = (
  resultCode: string,
  pickCode: string,
) => {
  const result = decodeFightResult(resultCode);
  const pick = decodeFightResult(pickCode);
  return pick === null ? 0 : calculatePickScore(pick, result ?? undefined) ?? 0;
};

export const FightResultsScoreMap = buildFightResultsScoreMap();
