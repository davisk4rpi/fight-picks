import React, { useCallback } from 'react';
import { IconButton } from 'react-native-paper';

import { FightPick } from '@fight-picks/models';
import { useNavigation } from '@react-navigation/native';

import { TaleOfTheTapePick } from '../../../components/feature';
import { useFightPickRowItem } from './fight-pick-row-item.hook';

interface FightPickRowItemProps {
  fightPick: Pick<
    FightPick,
    | 'id'
    | 'fightId'
    | 'userUid'
    | 'winningFighterId'
    | 'round'
    | 'method'
    | 'confidence'
  >;
}
export const FightPickRowItem = ({ fightPick }: FightPickRowItemProps) => {
  const { playerName, playerLoading, winningFighterName } =
    useFightPickRowItem(fightPick);
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
      round={fightPick.round}
      method={fightPick.method}
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
    console.log('navigation');
    navigate('AdminEditFightPick', {
      fightId,
      userUid,
      existingFightPickId,
    });
  }, [navigate, fightId, userUid, existingFightPickId]);
  return <IconButton onPress={handleEditPress} icon="pencil" />;
};
