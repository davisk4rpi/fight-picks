import { useCallback, useRef, useState } from 'react';

import { isMethodWithWinner } from '@fight-picks/models';

import { FightResultMethodFieldValue } from '../FightResultFields';
import { FightPickFormValues } from './types';

interface UseFightPickFormParams {
  initialValues: FightPickFormValues;
  onSuccess: (formValues: FightPickFormValues) => void;
}

export const useFightPickForm = ({
  initialValues,
  onSuccess,
}: UseFightPickFormParams) => {
  const [winningFighter, setWinningFighter] = useState(
    initialValues.winningFighter,
  );
  const [method, _setMethod] = useState(initialValues.method);
  const [round, setRound] = useState(initialValues.round);
  const [confidence, setConfidence] = useState(initialValues.confidence);
  const setMethod = useCallback((method: FightResultMethodFieldValue) => {
    if (isMethodWithWinner(method)) {
      _setMethod(method);
    } else {
      _setMethod(null);
    }
  }, []);

  const formValuesRef = useRef<FightPickFormValues>(initialValues);
  formValuesRef.current = {
    id: initialValues.id,
    userUid: initialValues.userUid,
    fightId: initialValues.fightId,
    winningFighter,
    method,
    round,
    confidence,
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
    confidence,
    setWinningFighter,
    setMethod,
    setRound,
    setConfidence,
    submitDisabled,
    roundDisabled: method === 'decision',
    handleSubmit,
  };
};

const isValidForm = ({
  winningFighter,
  method,
  round,
  confidence,
}: Omit<FightPickFormValues, 'id'>) => {
  return !(
    winningFighter === null ||
    method === null ||
    confidence === null ||
    (method !== 'decision' && round === null)
  );
};
