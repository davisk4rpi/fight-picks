import { FirebaseFightResult, getFightRef } from '../db';

/**
 * @deprecated since resultCodes have been added
 * @param fightId
 * @param result
 * @returns
 */
export const updateFightResult = async (
  fightId: string,
  result: FirebaseFightResult | null,
) => {
  const fightRef = getFightRef(fightId);
  return fightRef.update({ result });
};

export const updateFightResultCode = async (
  fightId: string,
  resultCode: string | null,
) => {
  const fightRef = getFightRef(fightId);
  return fightRef.update({ resultCode });
};
