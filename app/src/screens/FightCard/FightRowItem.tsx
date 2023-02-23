import React from 'react';
import { Pressable } from 'react-native';

import { TaleOfTheTape, TaleOfTheTapeProps } from '../../components/feature';
import { useFightRowItem } from './fight-row-item.hook';

interface FightRowItemProps {
  fightId: string;
  elevation?: TaleOfTheTapeProps['elevation'];
}

export const FightRowItem = ({ fightId, elevation }: FightRowItemProps) => {
  const { fight, fightPick, navigateToFightPickScreen, fighter1, fighter2 } =
    useFightRowItem(fightId);
  if (fight === undefined) return null;
  return (
    <Pressable onPress={navigateToFightPickScreen}>
      <TaleOfTheTape
        rounds={fight.rounds}
        weight={fight.weight}
        fighter1={fighter1}
        fighter2={fighter2}
        result={fight.result ?? fightPick}
        elevation={elevation}
      />
    </Pressable>
  );
};
