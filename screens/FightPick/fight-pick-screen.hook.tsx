import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { DummyEvent, DummyFightPick, FightPick } from '../../data-access';
import { useFightPickForm } from './fight-pick-form.hook';

export const useFightPickScreen = (fightId: string) => {
  const { goBack } = useNavigation();
  const fight =
    DummyEvent.fights.find(({ id }) => id === fightId) ?? DummyEvent.fights[0];

  const fightPick = DummyFightPick;
  fightPick.winningFighterId = fight?.fighter1.id || '1';

  const handleSuccess = useCallback(
    (fightPick: FightPick) => {
      // Save Fight Pick
      console.log(fightPick);
      goBack();
    },
    [goBack],
  );
  const fightPickForm = useFightPickForm(fight, undefined, handleSuccess);

  return {
    fight,
    event: DummyEvent,
    fightPickForm,
  };
};
