import { FightPick } from '@fight-picks/models';
import { useFightPickUserAndWinningFighter } from '@fight-picks/native-data-access';

export const useFightPickRowItem = (
  fightPick: Pick<FightPick, 'userUid' | 'winningFighterId'>,
) => {
  const { user, winningFighter } = useFightPickUserAndWinningFighter(fightPick);

  return {
    playerName: user?.displayName?.split(' ')[0] ?? '',
    winningFighterName: winningFighter?.name ?? '',
  };
};
