import { useUserByUid } from '../../../data-access/firestore';
import { selectFighterById, useAppSelector } from '../../../data-access/store';

export const useFightPickRowItem = (
  userUid: string,
  winningFighterId: string,
) => {
  const { user } = useUserByUid(userUid);
  const winningFighter = useAppSelector(state =>
    selectFighterById(state, winningFighterId),
  );

  return {
    playerName: user?.displayName?.split(' ')[0] ?? '',
    winningFighterName: winningFighter?.name ?? '',
  };
};
