import { LoadingScreen, NotFoundScreen, Screen } from '../../components';
import { StyleSheet, View } from 'react-native';

import { Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from '../../types';
import { SegmentedButtonsField } from './SegmentedButtonsField';
import { TaleOfTheTape } from '../../components/feature';
import { ThemeSpacing } from '../../app-context';
import { useFightPickScreen } from './fight-pick-screen.hook';

type FightPickScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FightPick'
>;

export const FightPickScreen = ({ route }: FightPickScreenProps) => {
  const { fightId } = route.params;
  const { fight, fightPickForm, loading } = useFightPickScreen(fightId);

  if (loading) {
    return <LoadingScreen testID="FightPickScreen" />;
  }
  if (fight === null) {
    return <NotFoundScreen testID="FightPickScreen" thing={'Fight'} />;
  }

  return (
    <Screen testID="FightPickScreen">
      <TaleOfTheTape
        key={fight.id}
        rounds={fight.rounds}
        weight={fight.weight}
        fighter1={fight.fighter1}
        fighter2={fight.fighter2}
      />
      <View style={styles.formContainer}>
        <View style={styles.formSegment}>
          <SegmentedButtonsField
            label="Winner"
            buttons={fightPickForm.selectWinnerButtons}
            value={fightPickForm.winningFighterId}
            onValueChange={fightPickForm.setWinningFighterId}
          />
        </View>
        <View style={styles.formSegment}>
          <SegmentedButtonsField
            label="Method"
            buttons={fightPickForm.selectMethodButtons}
            value={fightPickForm.method}
            onValueChange={fightPickForm.setMethod}
          />
        </View>
        <View style={styles.formSegment}>
          <SegmentedButtonsField
            label="Round"
            buttons={fightPickForm.selectRoundButtons}
            value={
              fightPickForm.method === 'decision' ? '' : fightPickForm.round
            }
            disabled={fightPickForm.method === 'decision'}
            onValueChange={fightPickForm.setRound}
          />
        </View>
        <View style={styles.formSegment}>
          <SegmentedButtonsField
            label="Confidence"
            buttons={fightPickForm.selectConfidenceButtons}
            value={fightPickForm.confidence}
            onValueChange={fightPickForm.setConfidence}
          />
        </View>
        <View style={styles.button}>
          <Button
            mode="contained"
            disabled={fightPickForm.submitDisabled}
            onPress={fightPickForm.handleSubmit}>
            Save
          </Button>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formSegment: {
    marginVertical: ThemeSpacing.base,
    marginHorizontal: ThemeSpacing.base * -1,
  },
  button: {
    marginTop: ThemeSpacing.base * 2,
    justifyContent: 'flex-end',
  },
});
