import React from 'react';
import { Pressable } from 'react-native';

import { TaleOfTheTape } from '../../components/feature';
import { FightWithPicks } from '../../data-access/hooks';
import { useFightRowItem } from './fight-row-item.hook';

interface FightRowItemProps {
  item: FightWithPicks;
}

export const FightRowItem = ({ item: fight }: FightRowItemProps) => {
  const { navigateToFightPickScreen, fighter1, fighter2 } =
    useFightRowItem(fight);
  return (
    <Pressable onPress={navigateToFightPickScreen}>
      <TaleOfTheTape
        key={fight.id}
        rounds={fight.rounds}
        weight={fight.weight}
        fighter1={fighter1}
        fighter2={fighter2}
        result={fight.pick}
        confidence={fight.pick?.confidence}
        elevation={2}
      />
    </Pressable>
  );
};
