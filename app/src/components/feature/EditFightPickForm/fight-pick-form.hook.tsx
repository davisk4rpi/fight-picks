import { useCallback, useEffect, useRef, useState } from 'react';

import { Fight } from '@fight-picks/models';

import { FightPickFormValues } from './types';

interface UseFightPickFormParams {
  fight: Pick<Fight, 'rounds'> | undefined;
  initialValues: FightPickFormValues;
  onSuccess: (formValues: FightPickFormValues) => void;
}

export const useFightPickForm = ({
  fight,
  initialValues,
  onSuccess,
}: UseFightPickFormParams) => {
  const [winningFighterId, setWinningFighterId] = useState<string>(
    initialValues.winningFighterId,
  );
  const [method, setMethod] = useState<string>(initialValues.method);
  const [round, setRound] = useState<string>(initialValues.round);
  const [confidence, setConfidence] = useState<string>(
    initialValues.confidence,
  );
  const formValuesRef = useRef<FightPickFormValues>(initialValues);
  formValuesRef.current = {
    id: initialValues.id,
    userUid: initialValues.userUid,
    fightId: initialValues.fightId,
    winningFighterId,
    method,
    round,
    confidence,
  };

  useEffect(() => {
    if (initialValues) {
      setWinningFighterId(prev =>
        prev !== '' ? prev : initialValues.winningFighterId,
      );
      setMethod(prev => (prev !== '' ? prev : initialValues.method));
      setRound(prev => (prev !== '' ? prev : initialValues.round ?? prev));
      setConfidence(prev => (prev !== '' ? prev : initialValues.confidence));
    }
  }, [initialValues]);

  const handleSubmit = useCallback(() => {
    if (isValidForm(formValuesRef.current)) {
      onSuccess(formValuesRef.current);
    }
  }, [onSuccess]);

  const submitDisabled =
    fight === undefined || !isValidForm(formValuesRef.current);

  return {
    winningFighterId,
    method,
    round,
    confidence,
    setWinningFighterId,
    setMethod,
    setRound,
    setConfidence,
    submitDisabled,
    roundDisabled: method === 'decision',
    handleSubmit,
  };
};

const isValidForm = ({
  winningFighterId,
  method,
  round,
  confidence,
}: Omit<FightPickFormValues, 'id'>) => {
  return !(
    winningFighterId === '' ||
    method === '' ||
    confidence === '' ||
    (method !== 'decision' && round === '')
  );
};
