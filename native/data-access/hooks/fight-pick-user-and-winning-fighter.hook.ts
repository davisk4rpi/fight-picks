import { Fighter, FightPick, User } from '@fight-picks/models';

import { useUserByUid } from '../firestore';
import { useSelectFighter } from '../store';

export type UseFightPickUserAndWinningFighterReturnValue = {
  winningFighter?: Fighter;
  user?: User;
  userLoading: boolean;
};

export const useFightPickUserAndWinningFighter = (
  fightPick: Pick<FightPick, 'userUid' | 'winningFighterId'>,
): UseFightPickUserAndWinningFighterReturnValue => {
  const { user, loading } = useUserByUid(fightPick.userUid);
  const winningFighter = useSelectFighter(fightPick.winningFighterId);

  return {
    user: user ?? undefined,
    userLoading: loading,
    winningFighter: winningFighter,
  };
};
