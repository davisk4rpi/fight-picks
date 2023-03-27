import { FirebaseFightResult, getFightRef } from '../db';

export const updateFightResult = async (
  fightId: string,
  result: FirebaseFightResult | null,
) => {
  const fightRef = getFightRef(fightId);
  return fightRef.update({ result });
};
