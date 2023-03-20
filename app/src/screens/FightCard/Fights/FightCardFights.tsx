import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { FightCard } from '@fight-picks/models';

import { FightCardScreenContext } from '../types';
import { FightRowItem } from './FightRowItem';

interface FightCardFightsProps
  extends Pick<FlatListProps<unknown>, 'style' | 'contentContainerStyle'> {
  fightCard: Pick<FightCard, 'id' | 'fightIds'>;
  context: FightCardScreenContext;
}

export const FightCardFights = ({
  fightCard,
  style,
  contentContainerStyle,
  context,
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
          context={context}
        />
      )}
      keyExtractor={id => id}
      extraData={context}
      scrollEnabled={fightCard.fightIds.length > 3}
      horizontal={false}
      contentContainerStyle={contentContainerStyle}
      indicatorStyle="white"
    />
  );
};
