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
import { useFightResultForm } from './fight-result-form.hook';
import { FightResultFormValues } from './types';

interface EditFightResultFormProps {
  maxRounds: Fight['rounds'];
  initialValues: FightResultFormValues;
  onSuccess: (formValues: FightResultFormValues) => void;
  fighter1: Fighter;
  fighter2: Fighter;
}

export const EditFightResultForm = ({
  maxRounds,
  initialValues,
  fighter1,
  fighter2,
  onSuccess,
}: EditFightResultFormProps) => {
  const fightPickForm = useFightResultForm({ initialValues, onSuccess });

  return (
    <View style={styles.formContainer}>
      <View style={styles.formSegment}>
        <FightResultMethodField
          value={fightPickForm.method}
          onValueChange={fightPickForm.setMethod}
        />
      </View>
      <View style={styles.formSegment}>
        <FightResultWinningFighterField
          fighter1={fighter1}
          fighter2={fighter2}
          value={fightPickForm.winningFighter}
          onValueChange={fightPickForm.setWinningFighter}
          disabled={fightPickForm.winningFighterDisabled}
        />
      </View>
      <View style={styles.formSegment}>
        <FightResultRoundField
          value={fightPickForm.round}
          onValueChange={fightPickForm.setRound}
          maxRounds={maxRounds}
          disabled={fightPickForm.roundDisabled}
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
