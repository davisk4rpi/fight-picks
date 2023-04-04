import { useCallback, useMemo } from 'react';

import {
  PLACEHOLDER_FIGHTER,
  updateFightResultCode,
  useSelectFightById,
  useSelectFightersFromFight,
} from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';
import {
  FightResultFormValues,
  mapEditFormValuesToFightResultCode,
  mapFightResultCodeToEditFormValues,
} from '../../components/feature';

export const useEditFightResultScreen = (fightId: string) => {
  const { goBack } = useNavigation();
  const fight = useSelectFightById(fightId);

  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const onSuccess = useCallback(
    (fightResult: FightResultFormValues | null) => {
      if (fight === undefined) return;
      const resultCode =
        fightResult === null
          ? null
          : mapEditFormValuesToFightResultCode(fightResult);
      updateFightResultCode(fight.id, resultCode);
      goBack();
    },
    [goBack, fight],
  );
  const initialValues = useMemo(
    () => mapFightResultCodeToEditFormValues(fight?.resultCode),
    [fight?.resultCode],
  );

  return {
    fight,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
    onSuccess,
    initialValues,
  };
};
