import {
  selectFighterById,
  useAppSelector,
  useUserByUid,
} from '@fight-picks/native-data-access';

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
