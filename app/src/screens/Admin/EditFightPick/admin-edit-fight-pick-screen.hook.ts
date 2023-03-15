import { useCallback, useEffect, useMemo } from 'react';

import {
  appFirestore,
  useFightPickByIdAndUid,
  useSelectFightById,
  useSelectFightersFromFight,
} from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';

import {
  FightPickFormValues,
  mapEditFormValuesToFightPick,
  mapFightPickToEditFightPickFormValues,
} from '../../../components/feature';

export const useAdminEditFightPickScreen = (
  userUid: string,
  fightId: string,
  fightPickId?: string,
) => {
  const { goBack } = useNavigation();
  const fight = useSelectFightById(fightId);
  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);
  const { fightPick, loading: fightPickLoading } = useFightPickByIdAndUid(
    fightPickId ?? '',
    userUid,
  );

  useEffect(() => {
    if (fight === undefined) {
      goBack();
    }
  }, [goBack, fight]);

  const initialValues = useMemo(() => {
    if (fightPick !== null) {
      return mapFightPickToEditFightPickFormValues(fightPick);
    }
    return mapFightPickToEditFightPickFormValues({
      userUid: userUid,
      fightId: fightId,
    });
  }, [fightPick, fightId, userUid]);

  const onSuccess = useCallback(
    (formValues: FightPickFormValues) => {
      // Save Fight Pick
      const fightPick = mapEditFormValuesToFightPick(formValues);
      appFirestore().repository.users.setFightPick(fightPick);
      goBack();
    },
    [goBack],
  );

  return {
    formLoading: fightPickLoading,
    fight,
    fighter1,
    fighter2,
    initialValues,
    onSuccess,
  };
};
