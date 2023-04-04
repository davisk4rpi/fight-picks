import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../../types';
import { Translation } from '../../../app-context';
import { LoadingScreen, NotFoundScreen, Screen } from '../../../components';
import { EditFightPickForm } from '../../../components/feature';
import { useAdminEditFightPickScreen } from './admin-edit-fight-pick-screen.hook';

type AdminEditFightPickScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AdminEditFightPick'
>;

const TEST_ID = 'AdminEditFightPickScreen';

export const AdminEditFightPickScreen = ({
  route,
}: AdminEditFightPickScreenProps) => {
  const { userUid, fightId, existingFightPickId } = route.params;

  const { fight, initialValues, onSuccess, formLoading, fighter1, fighter2 } =
    useAdminEditFightPickScreen(userUid, fightId, existingFightPickId);

  if (formLoading) {
    return <LoadingScreen testID={TEST_ID} />;
  }
  if (fight === undefined) {
    return <NotFoundScreen testID={TEST_ID} thing={Translation.fight} />;
  }

  return (
    <Screen testID={TEST_ID}>
      <View style={styles.formContainer}>
        <EditFightPickForm
          maxRounds={fight.rounds}
          fighter1={fighter1}
          fighter2={fighter2}
          initialValues={initialValues}
          onSuccess={onSuccess}
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
