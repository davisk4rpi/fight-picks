import { useCallback, useMemo } from 'react';

import { FightResult } from '@fight-picks/models';
import {
  mapFightResultToFirebaseResult,
  PLACEHOLDER_FIGHTER,
  updateFightResult,
  useSelectFightById,
  useSelectFightersFromFight,
} from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';

import { useFightResultForm } from './fight-result-form.hook';

export const useEditFightResultScreen = (fightId: string) => {
  const { goBack } = useNavigation();
  const fight = useSelectFightById(fightId);

  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const handleSuccess = useCallback(
    (fightResult: FightResult | null) => {
      if (fight === undefined) return;
      updateFightResult(fight.id, mapFightResultToFirebaseResult(fightResult));
      goBack();
    },
    [goBack, fight],
  );

  const formFight = useMemo(() => {
    if (
      fight === undefined ||
      fighter1 === undefined ||
      fighter2 === undefined
    ) {
      return undefined;
    }
    return {
      result: fight.result,
      rounds: fight.rounds,
      fighter1,
      fighter2,
    };
  }, [fight, fighter1, fighter2]);

  const fightResultForm = useFightResultForm(formFight, handleSuccess);

  return {
    fight,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
    fightResultForm,
  };
};
