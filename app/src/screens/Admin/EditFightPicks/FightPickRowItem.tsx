import React, { useCallback } from 'react';
import { IconButton } from 'react-native-paper';

import { Fighter, FightPick } from '@fight-picks/models';
import { useNavigation } from '@react-navigation/native';

import { TaleOfTheTapePick } from '../../../components/feature';
import { useFightPickRowItem } from './fight-pick-row-item.hook';

interface FightPickRowItemProps {
  fightPick: Pick<
    FightPick,
    'id' | 'fightId' | 'userUid' | 'resultCode' | 'confidence'
  >;
  fighter1: Fighter;
  fighter2: Fighter;
}
export const FightPickRowItem = ({
  fightPick,
  fighter1,
  fighter2,
}: FightPickRowItemProps) => {
  const { playerName, playerLoading, winningFighterName, result } =
    useFightPickRowItem(fightPick, fighter1, fighter2);
  const leftAdornment = useCallback(() => {
    return (
      <EditPickButton
        fightId={fightPick.fightId}
        userUid={fightPick.userUid}
        existingFightPickId={fightPick.id}
      />
    );
  }, [fightPick]);
  return (
    <TaleOfTheTapePick
      playerName={playerName}
      playerLoading={playerLoading}
      round={result.round}
      method={result.method}
      confidence={fightPick.confidence}
      winningFighterName={winningFighterName}
      leftAdornment={leftAdornment}
    />
  );
};

interface EditPickButtonProps {
  fightId: string;
  userUid: string;
  existingFightPickId: string;
}

const EditPickButton = ({
  fightId,
  userUid,
  existingFightPickId,
}: EditPickButtonProps) => {
  const { navigate } = useNavigation();
  const handleEditPress = useCallback(() => {
    navigate('AdminEditFightPick', {
      fightId,
      userUid,
      existingFightPickId,
    });
  }, [navigate, fightId, userUid, existingFightPickId]);
  return <IconButton onPress={handleEditPress} icon="pencil" />;
};
