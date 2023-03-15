import { useCallback, useMemo, useRef } from 'react';

import { Fight } from '@fight-picks/models';
import {
  appFirestore,
  PLACEHOLDER_FIGHTER,
  selectCurrentUserFightPicksStatus,
  useAppSelector,
  useSelectCurrentUser,
  useSelectCurrentUserFightPickByFightId,
  useSelectFightersFromFight,
} from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';

import {
  FightPickFormValues,
  mapEditFormValuesToFightPick,
  mapFightPickToEditFightPickFormValues,
} from '../../../components/feature/EditFightPickForm';
import { devEnv } from '../../../environments';

export const useEditFightPickScreen = (fight: Fight, mainCardDate: string) => {
  const { goBack, navigate } = useNavigation();

  const user = useSelectCurrentUser();
  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const fightCardDateRef = useRef(mainCardDate);
  fightCardDateRef.current = mainCardDate;

  const fightPick = useSelectCurrentUserFightPickByFightId(fight.id);

  const initialValues = useMemo(() => {
    if (fightPick !== undefined) {
      return mapFightPickToEditFightPickFormValues(fightPick);
    }
    return mapFightPickToEditFightPickFormValues({
      userUid: user?.uid ?? '',
      fightId: fight.id,
    });
  }, [fightPick, fight.id, user?.uid]);

  const fightPicksStatus = useAppSelector(selectCurrentUserFightPicksStatus);

  const onSuccess = useCallback(
    (formValues: FightPickFormValues) => {
      // Save Fight Pick
      if (
        (__DEV__ && devEnv.allowLatePicks) ||
        new Date(fightCardDateRef.current) > new Date()
      ) {
        const fightPick = mapEditFormValuesToFightPick(formValues);
        appFirestore().repository.users.setFightPick(fightPick);
      } else {
        // Send Toast alerting user that picks are already locked
        navigate('FightPick', { fightId: fight.id });
        return;
      }
      goBack();
    },
    [goBack, fight.id, navigate],
  );

  return {
    fight,
    initialValues,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
    loading: fightPicksStatus === 'pending',
    onSuccess,
  };
};
