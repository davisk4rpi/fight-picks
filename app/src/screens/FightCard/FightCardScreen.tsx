import React from 'react';
import { StyleSheet } from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList, RootTabParamList } from '../../../types';
import { ThemeSpacing, Translation } from '../../app-context';
import {
  EmptyScreen,
  LoadingScreen,
  Screen,
  SegmentedButtonsField,
  SegmentedButtonsFieldProps,
} from '../../components';
import { FightCardHeadline } from '../../components/feature';
import { useFightCardScreen } from './fight-card-screen.hook';
import { FightCardFights } from './Fights';
import { FightCardScoreboard } from './Scoreboard';

type FightCardScreenProps =
  | NativeStackScreenProps<RootStackParamList, 'FightCard'>
  | BottomTabScreenProps<RootTabParamList, 'CurrentFightCard'>;

const TEST_ID = 'FightCardScreen';

export const FightCardScreen = ({ route }: FightCardScreenProps) => {
  const fightCardId = route.params?.fightCardId;

  const { loading, fightCard, context, onContextValueChange, showNavigation } =
    useFightCardScreen(fightCardId);
  if (loading) return <LoadingScreen testID={TEST_ID} />;
  if (fightCard === undefined)
    return (
      <EmptyScreen testID={TEST_ID} message={Translation.noFightsLoaded} />
    );

  const scoreBoard = showNavigation ? undefined : (
    <FightCardScoreboard
      style={context === 'scores' ? styles.fightsFlatList : styles.displayNone}
      contentContainerStyle={styles.fightsFlatListContent}
      fightIds={fightCard.fightIds}
    />
  );
  const fights = (
    <FightCardFights
      context={context}
      style={context !== 'scores' ? styles.fightsFlatList : styles.displayNone}
      contentContainerStyle={styles.fightsFlatListContent}
      fightCard={fightCard}
    />
  );

  return (
    <Screen testID={TEST_ID} style={styles.screen}>
      <FightCardHeadline
        name={fightCard.name}
        mainCardDate={fightCard.mainCardDate}
      />
      {!showNavigation && (
        <SegmentedButtonsField
          value={context}
          buttons={contextButtons}
          onValueChange={onContextValueChange}
        />
      )}
      {scoreBoard}
      {fights}
    </Screen>
  );
};

const contextButtons: SegmentedButtonsFieldProps['buttons'] = [
  { label: Translation.picks, value: 'picks' },
  { label: Translation.results, value: 'results' },
  { label: Translation.scores, value: 'scores' },
];

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  fightsFlatList: {
    marginHorizontal: -1 * ThemeSpacing.horizontalScreen,
    paddingHorizontal: ThemeSpacing.horizontalScreen,
    marginTop: ThemeSpacing.base,
  },
  fightsFlatListContent: {
    paddingBottom: ThemeSpacing.verticalScreen,
  },
  displayNone: {
    display: 'none',
  },
});
