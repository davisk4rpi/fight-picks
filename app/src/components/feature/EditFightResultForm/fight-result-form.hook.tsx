import { isMethodWithNoRound, isMethodWithNoWinner } from '@fight-picks/models';
import { useCallback, useRef, useState } from 'react';

import { FightResultFormValues } from './types';

interface UseFightResultFormParams {
  initialValues: FightResultFormValues;
  onSuccess: (formValues: FightResultFormValues) => void;
}

export const useFightResultForm = ({
  initialValues,
  onSuccess,
}: UseFightResultFormParams) => {
  const [winningFighter, setWinningFighter] = useState(
    initialValues.winningFighter,
  );
  const [method, setMethod] = useState(initialValues.method);
  const [round, setRound] = useState(initialValues.round);

  const formValuesRef = useRef<FightResultFormValues>(initialValues);
  formValuesRef.current = {
    winningFighter,
    method,
    round,
  };

  const handleSubmit = useCallback(() => {
    if (isValidForm(formValuesRef.current)) {
      onSuccess(formValuesRef.current);
    }
  }, [onSuccess]);

  const submitDisabled = !isValidForm(formValuesRef.current);

  return {
    winningFighter,
    method,
    round,
    setWinningFighter,
    setMethod,
    setRound,
    submitDisabled,
    roundDisabled: isMethodWithNoRound(method),
    winningFighterDisabled: isMethodWithNoWinner(method),
    handleSubmit,
  };
};

const isValidForm = ({
  winningFighter,
  method,
  round,
}: Omit<FightResultFormValues, 'id'>) => {
  return !(
    winningFighter === null ||
    method === null ||
    (method !== 'decision' && round === null)
  );
};
