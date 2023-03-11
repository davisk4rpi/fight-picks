import { useCallback, useMemo } from 'react';

import { FightResult } from '@fight-picks/models';
import { useNavigation } from '@react-navigation/native';

import { appFirestore } from '../../data-access/firestore';
import {
  PLACEHOLDER_FIGHTER,
  selectFightById,
  useAppSelector,
  useSelectFightersFromFight,
} from '../../data-access/store';
import { useFightResultForm } from './fight-result-form.hook';

export const useEditFightResultScreen = (fightId: string) => {
  const { goBack } = useNavigation();
  const fight = useAppSelector(state => selectFightById(state, fightId));

  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const handleSuccess = useCallback(
    (fightResult: FightResult | null) => {
      if (fight === undefined) return;
      appFirestore.repository.fights.setResult(fight.id, fightResult);
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
