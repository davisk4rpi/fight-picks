import {
  FightPick,
  isConfidence,
  isMethodWithWinner,
  isRound,
} from '@fight-picks/models';

import { FightPickFormValues } from './types';

export const mapEditFormValuesToFightPick = ({
  id,
  userUid,
  fightId,
  winningFighterId,
  method,
  confidence,
  round,
}: FightPickFormValues): FightPick => {
  const validMethod = isMethodWithWinner(method) ? method : 'decision';

  const confidenceNum = Number(confidence);
  const validConfidence = isConfidence(confidenceNum) ? confidenceNum : 1;
  if (validMethod === 'decision') {
    return {
      id,
      userUid,
      fightId,
      winningFighterId,
      method: validMethod,
      confidence: validConfidence,
      round: null,
    };
  }

  const roundNum = Number(round);
  const validRound = isRound(roundNum) ? roundNum : 1;
  return {
    id,
    userUid,
    fightId,
    winningFighterId,
    method: validMethod,
    confidence: validConfidence,
    round: validRound,
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
    return {
      id: fightPick.id,
      userUid: fightPick.userUid,
      fightId: fightPick.fightId,
      winningFighterId: fightPick.winningFighterId,
      method: fightPick.method,
      confidence: fightPick.confidence.toString(),
      round: fightPick.round?.toString() ?? '',
    };
  }
  return {
    id: '',
    userUid: fightPick.userUid,
    fightId: fightPick.fightId,
    winningFighterId: '',
    method: '',
    confidence: '',
    round: '',
  };
};
