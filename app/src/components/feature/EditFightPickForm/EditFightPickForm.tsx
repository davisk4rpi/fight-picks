import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { Fight, Fighter } from '@fight-picks/models';

import { ThemeSpacing } from '../../../app-context';
import {
  FightResultMethodField,
  FightResultRoundField,
  FightResultWinningFighterField,
} from '../FightResultFields';
import { useFightPickForm } from './fight-pick-form.hook';
import { FightPickConfidenceField } from './FightPickConfidenceField';
import { FightPickFormValues } from './types';

interface EditFightPickFormProps {
  maxRounds: Fight['rounds'];
  initialValues: FightPickFormValues;
  fighter1: Fighter;
  fighter2: Fighter;
  onSuccess: (formValues: FightPickFormValues) => void;
}

export const EditFightPickForm = ({
  initialValues,
  fighter1,
  fighter2,
  onSuccess,
  maxRounds,
}: EditFightPickFormProps) => {
  const fightPickForm = useFightPickForm({
    initialValues,
    onSuccess,
  });

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSegment}>
        <FightResultWinningFighterField
          fighter1={fighter1}
          fighter2={fighter2}
          value={fightPickForm.winningFighter}
          onValueChange={fightPickForm.setWinningFighter}
        />
      </View>
      <View style={styles.formSegment}>
        <FightResultMethodField
          value={fightPickForm.method}
          onValueChange={fightPickForm.setMethod}
          fightPickOptionsOnly
        />
      </View>
      <View style={styles.formSegment}>
        <FightResultRoundField
          value={fightPickForm.roundDisabled ? null : fightPickForm.round}
          onValueChange={fightPickForm.setRound}
          maxRounds={maxRounds}
          disabled={fightPickForm.roundDisabled}
        />
      </View>
      <View style={styles.formSegment}>
        <FightPickConfidenceField
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
