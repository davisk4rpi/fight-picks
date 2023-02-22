import { useCallback, useMemo, useRef } from 'react';

import { Fight } from '@fight-picks/models';
import { useNavigation } from '@react-navigation/native';

import {
  appFirestore,
  SetFightPickInput,
} from '../../../data-access/firestore';
import { useFightPickByFightId } from '../../../data-access/hooks';
import {
  PLACEHOLDER_FIGHTER,
  useSelectFightersFromFight,
} from '../../../data-access/store';
import { useFightPickForm } from './fight-pick-form.hook';

export const useUnlockedFightPicksScreen = (
  fight: Fight,
  mainCardDate: string,
) => {
  const { goBack, navigate } = useNavigation();

  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const fightCardDateRef = useRef(mainCardDate);
  fightCardDateRef.current = mainCardDate;

  const { fightPick, fightPickLoading } = useFightPickByFightId(fight.id);

  const handleSuccess = useCallback(
    (fightPick: SetFightPickInput) => {
      // Save Fight Pick
      if (new Date(fightCardDateRef.current) > new Date()) {
        appFirestore.repository.users.setFightPick(fight.id, fightPick);
      } else {
        // Send Toast alerting user that picks are already locked
        navigate('FightPick', { fightId: fight.id });
        return;
      }
      goBack();
    },
    [goBack, fight.id, navigate],
  );

  const formFight = useMemo(() => {
    if (fighter1 === undefined || fighter2 === undefined) {
      return undefined;
    }
    return {
      rounds: fight.rounds,
      fighter1,
      fighter2,
    };
  }, [fight, fighter1, fighter2]);

  const fightPickForm = useFightPickForm(
    formFight,
    fightPick ?? undefined,
    handleSuccess,
  );

  return {
    fight,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
    fightPickForm,
    loading: fightPickLoading,
  };
};
