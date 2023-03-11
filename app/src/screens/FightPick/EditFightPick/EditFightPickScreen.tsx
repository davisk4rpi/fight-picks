import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { Fight } from '@fight-picks/models';

import { ThemeSpacing } from '../../../app-context';
import {
  LoadingScreen,
  NotFoundScreen,
  Screen,
  SegmentedButtonsField,
} from '../../../components';
import { TaleOfTheTape } from '../../../components/feature';
import { useEditFightPickScreen } from './edit-fight-pick-screen.hook';

interface EditFightPicksScreenProps {
  fight: Fight;
  mainCardDate: string;
}

export const EditFightPickScreen = ({
  fight,
  mainCardDate,
}: EditFightPicksScreenProps) => {
  const { fightPickForm, fighter1, fighter2, loading } = useEditFightPickScreen(
    fight,
    mainCardDate,
  );

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
        fighter1={fighter1}
        fighter2={fighter2}
        isCanceled={fight.isCanceled}
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
    maxWidth: 380,
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
