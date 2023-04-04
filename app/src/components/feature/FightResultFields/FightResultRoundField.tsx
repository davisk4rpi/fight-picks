import { isRound, Round } from '@fight-picks/models';
import React, { useCallback } from 'react';

import { Translation } from '../../../app-context';
import {
  SegmentedButtonsField,
  SegmentedButtonsFieldProps,
} from '../../SegmentedButtonsField';

export type FightResultRoundFieldValue = Round | null;

interface FightResultRoundFieldProps {
  value: FightResultRoundFieldValue;
  onValueChange: (val: FightResultRoundFieldValue) => void;
  maxRounds: 3 | 5;
  disabled?: boolean;
}

export const FightResultRoundField = ({
  value,
  onValueChange,
  maxRounds,
  disabled = false,
}: FightResultRoundFieldProps) => {
  const wrappedOnValueChange = useCallback(
    (val: string) => onValueChange(convertFromStringValue(val, maxRounds)),
    [onValueChange, maxRounds],
  );
  return (
    <SegmentedButtonsField
      label={Translation.round}
      buttons={maxRounds === 5 ? fiveButtons : threeButtons}
      value={value?.toString() ?? ''}
      onValueChange={wrappedOnValueChange}
      disabled={disabled}
    />
  );
};

const threeButtons: SegmentedButtonsFieldProps['buttons'] = [
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

const fiveButtons: SegmentedButtonsFieldProps['buttons'] = [
  ...threeButtons,
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

const convertFromStringValue = (
  val: string,
  maxRounds: 3 | 5,
): FightResultRoundFieldValue => {
  const numVal = Number(val);
  if (isRound(numVal)) return numVal > maxRounds ? maxRounds : numVal;
  return null;
};
