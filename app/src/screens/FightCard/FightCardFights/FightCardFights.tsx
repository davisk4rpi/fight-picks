import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { FightCard } from '@fight-picks/models';

import { FightRowItem } from './FightRowItem';

interface FightCardFightsProps
  extends Pick<FlatListProps<unknown>, 'style' | 'contentContainerStyle'> {
  fightCard: Pick<FightCard, 'id' | 'fightIds'>;
}

export const FightCardFights = ({
  fightCard,
  style,
  contentContainerStyle,
}: FightCardFightsProps) => {
  return (
    <FlatList
      style={style}
      data={fightCard.fightIds}
      renderItem={obj => (
        <FightRowItem
          key={obj.item}
          fightId={obj.item}
          elevation={fightCard.id === undefined ? 2 : 1}
        />
      )}
      keyExtractor={id => id}
      scrollEnabled={fightCard.fightIds.length > 3}
      horizontal={false}
      contentContainerStyle={contentContainerStyle}
      indicatorStyle="white"
    />
  );
};
