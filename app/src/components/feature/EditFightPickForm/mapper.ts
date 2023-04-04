import {
  decodeFightResult,
  encodeFightResult,
  FightPick,
  FightResult,
  isMethodWithWinner,
} from '@fight-picks/models';

import { WithOptional } from '@fight-picks/utilities';

import { FightPickFormValues } from './types';

export const mapEditFormValuesToFightPick = ({
  id,
  userUid,
  fightId,
  winningFighter,
  method,
  confidence,
  round,
}: FightPickFormValues): WithOptional<FightPick, 'id'> => {
  const validId = id === '' ? undefined : id;

  const validConfidence = confidence ?? 1;

  const validMethod = method ?? 'decision';
  const validWinningFighter = winningFighter ?? 1;
  const validRound = round ?? 1;

  const result: FightResult =
    validMethod === 'decision'
      ? {
          method: validMethod,
          winningFighter: validWinningFighter,
          round: null,
        }
      : {
          method: validMethod,
          winningFighter: validWinningFighter,
          round: validRound,
        };
  return {
    id: validId,
    userUid,
    fightId,
    resultCode: encodeFightResult(result),
    confidence: validConfidence,
  };
};

const isFullFightPick = (
  fightPick: FightPick | Pick<FightPick, 'userUid' | 'fightId'>,
): fightPick is FightPick => {
  if ((fightPick as FightPick).id !== undefined) return true;
  return false;
};

export const mapFightPickToEditFightPickFormValues = (
  fightPick: FightPick | Pick<FightPick, 'userUid' | 'fightId'>,
): FightPickFormValues => {
  if (isFullFightPick(fightPick)) {
    const { method, winningFighter, round } = decodeFightResult(
      fightPick.resultCode,
    );
    const validMethod = isMethodWithWinner(method) ? method : null;
    return {
      id: fightPick.id,
      userUid: fightPick.userUid,
      fightId: fightPick.fightId,
      winningFighter,
      method: validMethod,
      round,
      confidence: fightPick.confidence,
    };
  }
  return {
    id: '',
    userUid: fightPick.userUid,
    fightId: fightPick.fightId,
    winningFighter: null,
    method: null,
    confidence: null,
    round: null,
  };
};
