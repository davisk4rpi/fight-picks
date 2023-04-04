import { useCallback, useMemo } from 'react';

import { decodeFightResult, Fighter, FightPick } from '@fight-picks/models';
import { useUserByUid } from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';

export const useFightPickRowItem = (
  fightPick: Pick<FightPick, 'id' | 'fightId' | 'userUid' | 'resultCode'>,
  fighter1: Fighter,
  fighter2: Fighter,
) => {
  const { navigate } = useNavigation();
  const handleEditPress = useCallback(() => {
    navigate('AdminEditFightPick', {
      fightId: fightPick.fightId,
      userUid: fightPick.userUid,
    });
  }, [navigate, fightPick.fightId, fightPick.userUid]);

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
    playerLoading: playerLoading,
    winningFighterName: winningFighter?.name ?? '',
    handleEditPress,
    result,
  };
};
