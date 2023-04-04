import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../types';
import { Translation } from '../../app-context';
import { NotFoundScreen, Screen } from '../../components';
import { EditFightResultForm, TaleOfTheTape } from '../../components/feature';
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
  const { initialValues, onSuccess, fighter1, fighter2, fight } =
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
      <EditFightResultForm
        maxRounds={fight.rounds}
        fighter1={fighter1}
        fighter2={fighter2}
        initialValues={initialValues}
        onSuccess={onSuccess}
      />
    </Screen>
  );
};
