import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { Fight, Fighter } from '@fight-picks/models';

import { ThemeSpacing } from '../../../app-context';
import { ConfidenceField } from './ConfidenceField';
import { useFightPickForm } from './fight-pick-form.hook';
import { MethodField } from './MethodField';
import { RoundField } from './RoundField';
import { FightPickFormValues } from './types';
import { WinningFighterField } from './WinningFighterField';

interface EditFightPickFormProps {
  fight: Fight;
  initialValues: FightPickFormValues;
  fighter1: Fighter;
  fighter2: Fighter;
  onSuccess: (formValues: FightPickFormValues) => void;
}

export const EditFightPickForm = ({
  fight,
  initialValues,
  fighter1,
  fighter2,
  onSuccess,
}: EditFightPickFormProps) => {
  const fightPickForm = useFightPickForm({ fight, initialValues, onSuccess });

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSegment}>
        <WinningFighterField
          fighter1={fighter1}
          fighter2={fighter2}
          value={fightPickForm.winningFighterId}
          onValueChange={fightPickForm.setWinningFighterId}
        />
      </View>
      <View style={styles.formSegment}>
        <MethodField
          value={fightPickForm.method}
          onValueChange={fightPickForm.setMethod}
        />
      </View>
      <View style={styles.formSegment}>
        <RoundField
          value={fightPickForm.round}
          onValueChange={fightPickForm.setRound}
          maxRounds={fight.rounds}
          disabled={fightPickForm.roundDisabled}
        />
      </View>
      <View style={styles.formSegment}>
        <ConfidenceField
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
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
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
