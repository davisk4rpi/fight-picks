import { useCallback, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  useFightCard,
  useFightPickByFightId,
  useFightWithFighters,
} from '../../data-access';
import { appFirestore, SetFightPickInput } from '../../data-access/db';
import { useFightPickForm } from './fight-pick-form.hook';

export const useFightPickScreen = (fightId: string) => {
  const { goBack, navigate } = useNavigation();
  const { fight, loading: fightLoading } = useFightWithFighters(fightId);

  const { fightCard, loading: fightCardLoading } = useFightCard(
    fight?.fightCardId,
  );

  const fightCardDateRef = useRef(fightCard?.mainCardDate);
  fightCardDateRef.current = fightCard?.mainCardDate;

  const { fightPick, fightPickLoading } = useFightPickByFightId(fightId);

  const handleSuccess = useCallback(
    (fightPick: SetFightPickInput) => {
      // Save Fight Pick
      if (fightCardDateRef.current === undefined) {
        return;
      } else if (fightCardDateRef.current > new Date()) {
        appFirestore.repository.users.setFightPick(fightId, fightPick);
      } else {
        // Send Toast alerting user that picks are already locked
        navigate('LockedFightPicks', { fightId });
        return;
      }
      goBack();
    },
    [goBack, fightId, navigate],
  );
  const fightPickForm = useFightPickForm(
    fight ?? undefined,
    fightPick ?? undefined,
    handleSuccess,
  );

  return {
    fight,
    fightPickForm,
    loading: fightPickLoading || fightLoading || fightCardLoading,
  };
};
