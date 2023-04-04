import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { TaleOfTheTape, TaleOfTheTapeProps } from '../../../components/feature';
import { FightCardScreenContext } from '../types';
import { useFightRowItem } from './fight-row-item.hook';

interface FightRowItemProps {
  fightId: string;
  elevation?: TaleOfTheTapeProps['elevation'];
  context: FightCardScreenContext;
}

export const FightRowItem = ({
  fightId,
  elevation,
  context,
}: FightRowItemProps) => {
  const {
    fight,
    navigateToFightPickScreen,
    fighter1,
    fighter2,
    taleOfTheTapeResult,
    confidence,
  } = useFightRowItem(fightId, context);
  if (fight === undefined) return null;
  if (
    !fight.isCanceled &&
    context === 'results' &&
    taleOfTheTapeResult === undefined
  )
    return <></>;
  return (
    <Pressable
      onPress={navigateToFightPickScreen}
      disabled={fight.isCanceled}
      style={fight.isCanceled ? styles.disabled : undefined}>
      <TaleOfTheTape
        rounds={fight.rounds}
        weight={fight.weight}
        fighter1={fighter1}
        fighter2={fighter2}
        result={taleOfTheTapeResult}
        elevation={elevation}
        isCanceled={fight.isCanceled}
        confidence={confidence}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.6,
  },
});
