import { MethodMap } from '../../types';

const buildAllFightResultCodes = () => {
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

export const FightResultCodes = buildAllFightResultCodes();
