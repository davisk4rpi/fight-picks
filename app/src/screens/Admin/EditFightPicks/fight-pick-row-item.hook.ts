import { useCallback } from 'react';

import { FightPick } from '@fight-picks/models';
import { useFightPickUserAndWinningFighter } from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';

export const useFightPickRowItem = (
  fightPick: Pick<FightPick, 'id' | 'fightId' | 'userUid' | 'winningFighterId'>,
) => {
  const { user, winningFighter, userLoading } =
    useFightPickUserAndWinningFighter(fightPick);
  const { navigate } = useNavigation();
  const handleEditPress = useCallback(() => {
    navigate('AdminEditFightPick', {
      fightId: fightPick.fightId,
      userUid: fightPick.userUid,
    });
  }, [navigate, fightPick.fightId, fightPick.userUid]);

  return {
    playerName: user?.displayName?.split(' ')[0] ?? '',
    playerLoading: userLoading,
    winningFighterName: winningFighter?.name ?? '',
    handleEditPress,
  };
};
