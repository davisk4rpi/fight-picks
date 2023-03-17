import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList, RootTabParamList } from '../../../types';
import { ThemeSpacing, Translation } from '../../app-context';
import {
  LoadingScreen,
  Screen,
  SegmentedButtonsField,
  SegmentedButtonsFieldProps,
} from '../../components';
import { FightCardHeadline } from '../../components/feature';
import { useFightCardScreen } from './fight-card-screen.hook';
import { FightCardFights } from './FightCardFights';
import { FightCardScoreboard } from './FightCardScoreboard';

type FightCardScreenProps =
  | NativeStackScreenProps<RootStackParamList, 'FightCard'>
  | BottomTabScreenProps<RootTabParamList, 'CurrentFightCard'>;

export const FightCardScreen = ({ route }: FightCardScreenProps) => {
  const fightCardId = route.params?.fightCardId;

  const {
    loading,
    fightCard,
    context,
    onContextValueChange,
    isFightCardInFuture,
  } = useFightCardScreen(fightCardId);
  if (loading) return <LoadingScreen testID="FightCardScreen" />;
  if (fightCard === undefined)
    return (
      <Screen testID="FightCardScreen">
        <Text variant="displayMedium" adjustsFontSizeToFit numberOfLines={1}>
          No Fights Loaded
        </Text>
      </Screen>
    );

  const scoreBoard = isFightCardInFuture ? undefined : (
    <FightCardScoreboard
      style={context === 'scores' ? styles.fightsFlatList : styles.displayNone}
      contentContainerStyle={styles.fightsFlatListContent}
      fightIds={fightCard.fightIds}
    />
  );
  const fights = (
    <FightCardFights
      style={context === 'fights' ? styles.fightsFlatList : styles.displayNone}
      contentContainerStyle={styles.fightsFlatListContent}
      fightCard={fightCard}
    />
  );

  return (
    <Screen testID="FightCardScreen" style={styles.screen}>
      <FightCardHeadline
        name={fightCard.name}
        mainCardDate={fightCard.mainCardDate}
      />
      {!isFightCardInFuture && (
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
  { label: Translation.fights, value: 'fights' },
  { label: Translation.scores, value: 'scores' },
];

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
  displayNone: {
    display: 'none',
  },
});
