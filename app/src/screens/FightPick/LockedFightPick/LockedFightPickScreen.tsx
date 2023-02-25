import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Fight } from '@fight-picks/models';

import { ThemeSpacing } from '../../../app-context';
import { LoadingScreen, NotFoundScreen, Screen } from '../../../components';
import { TaleOfTheTape, TaleOfTheTapePick } from '../../../components/feature';
import {
  FightPickWithUserAndScore,
  useLockedFightPickScreen,
} from './locked-fight-pick-screen.hook';

interface LockedFightPicksScreenProps {
  fight: Fight;
  mainCardDate: string;
}

export const LockedFightPickScreen = ({
  fight,
}: LockedFightPicksScreenProps) => {
  const { fightPicks, loading, fighter1, fighter2 } =
    useLockedFightPickScreen(fight);
  const FightPickRowItem = useCallback(
    ({ item }: { item: FightPickWithUserAndScore }) => {
      const { id, round, method, confidence, score, winningFighterId, user } =
        item;
      return (
        <TaleOfTheTapePick
          key={id}
          playerName={user.displayName?.split(' ')[0] ?? ''}
          round={round}
          method={method}
          score={score}
          confidence={confidence}
          winningFighter={
            winningFighterId === fighter1.id ? fighter1 : fighter2
          }
        />
      );
    },
    [fighter1, fighter2],
  );

  if (loading) {
    return <LoadingScreen testID="LockedFightPicksScreen" />;
  }
  if (fight === null) {
    return <NotFoundScreen testID="LockedFightPicksScreen" thing={'Fight'} />;
  }

  return (
    <Screen testID="LockedFightPicksScreen">
      <TaleOfTheTape
        key={fight.id}
        rounds={fight.rounds}
        weight={fight.weight}
        fighter1={fighter1}
        fighter2={fighter2}
        result={fight.result}
        elevation={0}
      />
      <FlatList
        style={styles.fightsFlatList}
        data={fightPicks}
        renderItem={FightPickRowItem}
        keyExtractor={({ id }) => id}
        scrollEnabled={fightPicks.length > 3}
        horizontal={false}
        contentContainerStyle={styles.fightsFlatListContent}
        indicatorStyle="white"
        extraData={fight?.result}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  fightsFlatList: {
    marginHorizontal: -1 * ThemeSpacing.horizontalScreen,
    paddingHorizontal: ThemeSpacing.horizontalScreen,
  },
  fightsFlatListContent: {
    paddingBottom: ThemeSpacing.verticalScreen,
  },
});
