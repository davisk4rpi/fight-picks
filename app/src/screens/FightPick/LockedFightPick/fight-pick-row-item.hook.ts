import { decodeFightResult, Fighter, FightPick } from '@fight-picks/models';
import { useUserByUid } from '@fight-picks/native-data-access';
import { useMemo } from 'react';

export const useFightPickRowItem = (
  fightPick: Pick<FightPick, 'userUid' | 'resultCode'>,
  fighter1: Fighter,
  fighter2: Fighter,
) => {
  const { user: player, loading: playerLoading } = useUserByUid(
    fightPick.userUid,
  );
  const result = useMemo(
    () => decodeFightResult(fightPick.resultCode),
    [fightPick.resultCode],
  );
  const winningFighter = result.winningFighter === 1 ? fighter1 : fighter2;

  return {
    playerName: player?.displayName?.split(' ')[0] ?? '',
    playerLoading,
    winningFighterName: winningFighter?.name ?? '',
    result,
  };
};
