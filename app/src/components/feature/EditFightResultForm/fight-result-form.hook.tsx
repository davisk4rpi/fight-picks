import {
  isFightResult,
  isMethodWithNoRound,
  isMethodWithNoWinner,
} from '@fight-picks/models';
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
    winningFighter: isMethodWithNoWinner(method) ? null : winningFighter,
    method,
    round: isMethodWithNoRound(method) ? null : round,
  };

  const handleSubmit = useCallback(() => {
    if (isValidForm(formValuesRef.current)) {
      onSuccess(formValuesRef.current);
    }
  }, [onSuccess]);

  const submitDisabled = !isValidForm(formValuesRef.current);

  return {
    winningFighter: formValuesRef.current.winningFighter,
    method,
    round: formValuesRef.current.round,
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
  method,
  winningFighter,
  round,
}: Omit<FightResultFormValues, 'id'>) =>
  method !== null && isFightResult({ method, winningFighter, round });
