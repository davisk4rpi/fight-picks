import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useFightPickByFightId, useFightWithFighters } from '../../data-access';
import { db, FightPick } from '../../data-access/db';
import { useFightPickForm } from './fight-pick-form.hook';

export const useFightPickScreen = (fightId: string) => {
  const { goBack } = useNavigation();
  const { fight, loading: fightLoading } = useFightWithFighters(fightId);

  const { fightPick, fightPickLoading } = useFightPickByFightId(fightId);

  const handleSuccess = useCallback(
    (fightPick: FightPick) => {
      // Save Fight Pick
      db.users.setFightPick(fightId, fightPick);
      goBack();
    },
    [goBack, fightId],
  );
  const fightPickForm = useFightPickForm(
    fight ?? undefined,
    fightPick ?? undefined,
    handleSuccess,
  );

  return {
    fight,
    fightPickForm,
    loading: fightPickLoading || fightLoading,
  };
};
