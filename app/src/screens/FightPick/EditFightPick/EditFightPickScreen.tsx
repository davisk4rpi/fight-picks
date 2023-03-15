import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Fight } from '@fight-picks/models';

import { LoadingScreen, Screen } from '../../../components';
import { EditFightPickForm, TaleOfTheTape } from '../../../components/feature';
import { useEditFightPickScreen } from './edit-fight-pick-screen.hook';

interface EditFightPicksScreenProps {
  fight: Fight;
  mainCardDate: string;
}

export const EditFightPickScreen = ({
  fight,
  mainCardDate,
}: EditFightPicksScreenProps) => {
  const { initialValues, onSuccess, fighter1, fighter2, loading } =
    useEditFightPickScreen(fight, mainCardDate);

  if (loading) {
    return <LoadingScreen testID="FightPickScreen" />;
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
        <EditFightPickForm
          fight={fight}
          fighter1={fighter1}
          fighter2={fighter2}
          onSuccess={onSuccess}
          initialValues={initialValues}
        />
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
});
