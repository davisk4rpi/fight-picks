import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SegmentedButtonsProps } from 'react-native-paper';

import {
  Confidence,
  Fight,
  Fighter,
  FightPick,
  MethodWithWinner,
  Round,
} from '../../data-access/db';

type FormValues = {
  id: string;
  winningFighterId: string;
  method: string;
  round: string;
  confidence: string;
};

type PartialFight = Pick<Fight, 'rounds'> & {
  fighter1: Pick<Fighter, 'id' | 'name'>;
  fighter2: Pick<Fighter, 'id' | 'name'>;
};

export const useFightPickForm = (
  fight: PartialFight | undefined,
  existingPick: FightPick | undefined,
  onSuccess: (fightPick: FightPick) => void,
) => {
  const [winningFighterId, setWinningFighterId] = useState<string>(
    existingPick?.winningFighterId ?? '',
  );
  const [method, setMethod] = useState<string>(existingPick?.method ?? '');
  const [round, setRound] = useState<string>(
    existingPick?.round?.toString() ?? '',
  );
  const [confidence, setConfidence] = useState<string>(
    existingPick?.confidence.toString() ?? '',
  );
  const formValuesRef = useRef<FormValues>({
    id: existingPick?.id ?? '',
    winningFighterId,
    method,
    round,
    confidence,
  });
  formValuesRef.current = {
    id: existingPick?.id ?? '',
    winningFighterId,
    method,
    round,
    confidence,
  };

  useEffect(() => {
    if (existingPick) {
      setWinningFighterId(prev =>
        prev !== '' ? prev : existingPick.winningFighterId,
      );
      setMethod(prev => (prev !== '' ? prev : existingPick.method));
      setRound(prev =>
        prev !== '' ? prev : existingPick.round?.toString() ?? prev,
      );
      setConfidence(prev =>
        prev !== '' ? prev : existingPick.confidence.toString(),
      );
    }
  }, [existingPick]);

  const selectWinnerButtons: SegmentedButtonsProps['buttons'] = useMemo(
    () => [
      {
        value: fight?.fighter1.id ?? '1',
        label: fight?.fighter1.name ?? '',
      },
      {
        value: fight?.fighter2.id ?? '2',
        label: fight?.fighter2.name ?? '',
      },
    ],
    [fight],
  );

  const selectRoundButtons: SegmentedButtonsProps['buttons'] = useMemo(
    () => (fight?.rounds === 5 ? fiveButtons : threeButtons),
    [fight],
  );

  const handleSubmit = useCallback(() => {
    if (isValidForm(formValuesRef.current)) {
      // loading
      // Save pick to firebase
      // stop loading
      onSuccess(convertFormToFightPick(formValuesRef.current));
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
    selectWinnerButtons,
    selectMethodButtons,
    selectRoundButtons,
    selectConfidenceButtons: fiveButtons,
    submitDisabled,
    handleSubmit,
  };
};

const isValidForm = ({
  winningFighterId,
  method,
  round,
  confidence,
}: Omit<FormValues, 'id'>) => {
  return !(
    winningFighterId === '' ||
    method === '' ||
    confidence === '' ||
    (method !== 'decision' && round === '')
  );
};

const MethodMap: Record<string, MethodWithWinner> = {
  decision: 'decision',
  knockout: 'knockout',
  submission: 'submission',
};

const RoundMap: Record<string, Round> = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
};
const ConfidenceMap: Record<string, Confidence> = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
};

const convertFormToFightPick = (formValues: FormValues): FightPick => {
  const method = MethodMap[formValues.method] ?? 'decision';
  const confidence = ConfidenceMap[formValues.confidence] ?? 1;
  if (method === 'decision') {
    return {
      id: formValues.id,
      winningFighterId: formValues.winningFighterId,
      method,
      confidence,
      round: null,
    };
  }

  const round = RoundMap[formValues.round] ?? 1;
  return {
    id: formValues.id,
    winningFighterId: formValues.winningFighterId,
    method,
    confidence,
    round,
  };
};

const selectMethodButtons: SegmentedButtonsProps['buttons'] = [
  {
    value: 'decision',
    label: 'DEC',
  },
  {
    value: 'knockout',
    label: 'KO',
  },
  {
    value: 'submission',
    label: 'SUB',
  },
];

const threeButtons: SegmentedButtonsProps['buttons'] = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
];

const fiveButtons: SegmentedButtonsProps['buttons'] = [
  ...threeButtons,
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];
