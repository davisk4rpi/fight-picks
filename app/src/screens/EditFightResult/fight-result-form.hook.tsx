import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SegmentedButtonsProps } from 'react-native-paper';

import {
  Fight,
  Fighter,
  FightResult,
  isFightResult,
  isMethodWithNoRound,
  isMethodWithNoWinner,
  Method,
  MethodMap,
  RawFightResult,
  Round,
  RoundMap,
  RoundMapKey,
} from '@fight-picks/models';

type FormValues = {
  winningFighterId: string;
  method: string;
  round: string;
};

type FormFight = Pick<Fight, 'rounds' | 'result'> & {
  fighter1: Fighter;
  fighter2: Fighter;
};

export const useFightResultForm = (
  fight: FormFight | undefined,
  onSuccess: (result: FightResult | null) => void,
) => {
  const [winningFighterId, setWinningFighterId] = useState<string>(
    fight?.result?.winningFighterId ?? '',
  );
  const [method, setMethod] = useState<string>(fight?.result?.method ?? '');
  const [round, setRound] = useState<string>(
    fight?.result?.round?.toString() ?? '',
  );
  const formValuesRef = useRef<FormValues>({
    winningFighterId,
    method,
    round,
  });
  formValuesRef.current = {
    winningFighterId,
    method,
    round,
  };

  useEffect(() => {
    const result = fight?.result;
    if (result) {
      setWinningFighterId(prev =>
        prev !== '' ? prev : result.winningFighterId ?? '',
      );
      setMethod(prev => (prev !== '' ? prev : result.method));
      setRound(prev => (prev !== '' ? prev : result.round?.toString() ?? prev));
    }
  }, [fight?.result]);

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
    [fight?.fighter1, fight?.fighter2],
  );

  const selectRoundButtons: SegmentedButtonsProps['buttons'] = useMemo(
    () => (fight?.rounds === 5 ? fiveButtons : threeButtons),
    [fight?.rounds],
  );

  const handleSubmit = useCallback(() => {
    const fightResult = convertFormToRawFightResult(formValuesRef.current);
    if (isFightResult(fightResult)) {
      onSuccess(fightResult);
    } else {
      // push toast
    }
  }, [onSuccess]);

  const handleClear = useCallback(() => {
    onSuccess(null);
  }, [onSuccess]);

  const submitDisabled = fight === undefined;

  return {
    winningFighterId,
    method,
    round,
    setWinningFighterId,
    setMethod,
    setRound,
    selectWinnerButtons,
    selectMethodButtons,
    selectRoundButtons,
    selectConfidenceButtons: fiveButtons,
    submitDisabled,
    handleSubmit,
    handleClear,
  };
};

const convertFormToRawFightResult = (
  formValues: FormValues,
): RawFightResult => {
  const method = MethodMap[formValues.method as Method] ?? '';
  let winningFighterId: string | null = formValues.winningFighterId;
  let round: Round | null = RoundMap[formValues.round as RoundMapKey] ?? null;
  if (isMethodWithNoRound(method)) {
    round = null;
  }
  if (isMethodWithNoWinner(method)) {
    winningFighterId = null;
  }
  return {
    winningFighterId,
    method,
    round,
  };
};

const selectMethodButtons: SegmentedButtonsProps['buttons'] = [
  {
    value: MethodMap.decision,
    label: 'DEC',
  },
  {
    value: MethodMap.knockout,
    label: 'KO',
  },
  {
    value: MethodMap.submission,
    label: 'SUB',
  },
  {
    value: MethodMap.draw,
    label: 'DRAW',
  },
  {
    value: MethodMap.no_contest,
    label: 'NC',
  },
  {
    value: MethodMap.disqualification,
    label: 'DQ',
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
