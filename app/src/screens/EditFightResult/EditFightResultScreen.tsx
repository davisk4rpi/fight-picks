import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { isMethodWithNoRound, isMethodWithNoWinner } from '@fight-picks/models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../types';
import { ThemeSpacing, Translation } from '../../app-context';
import {
  NotFoundScreen,
  Screen,
  SegmentedButtonsField,
} from '../../components';
import { TaleOfTheTape } from '../../components/feature';
import { useEditFightResultScreen } from './edit-fight-result-screen.hook';

type EditFightResultScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditFightResult'
>;
const TEST_ID = 'EditFightResultScreen';

export const EditFightResultScreen = ({
  route,
}: EditFightResultScreenProps) => {
  const { fightId } = route.params;
  const { fightResultForm, fighter1, fighter2, fight } =
    useEditFightResultScreen(fightId);

  if (fight === undefined) {
    return <NotFoundScreen testID={TEST_ID} thing={Translation.fight} />;
  }

  return (
    <Screen testID={TEST_ID}>
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
            label={Translation.method}
            buttons={fightResultForm.selectMethodButtons}
            value={fightResultForm.method}
            onValueChange={fightResultForm.setMethod}
          />
        </View>
        <View style={styles.formSegment}>
          <SegmentedButtonsField
            label={Translation.winner}
            buttons={fightResultForm.selectWinnerButtons}
            value={
              isMethodWithNoWinner(fightResultForm.method)
                ? ''
                : fightResultForm.winningFighterId
            }
            disabled={isMethodWithNoWinner(fightResultForm.method)}
            onValueChange={fightResultForm.setWinningFighterId}
          />
        </View>
        <View style={styles.formSegment}>
          <SegmentedButtonsField
            label={Translation.round}
            buttons={fightResultForm.selectRoundButtons}
            value={
              isMethodWithNoRound(fightResultForm.method)
                ? ''
                : fightResultForm.round
            }
            disabled={isMethodWithNoRound(fightResultForm.method)}
            onValueChange={fightResultForm.setRound}
          />
        </View>
        <View style={styles.button}>
          <Button
            mode="contained"
            disabled={fightResultForm.submitDisabled}
            onPress={fightResultForm.handleSubmit}>
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
