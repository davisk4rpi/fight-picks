import { isRound, Round } from '@fight-picks/models';
import React, { useCallback } from 'react';

import { Translation } from '../../../app-context';
import {
  ToggleButtonsField,
  ToggleButtonsFieldProps,
} from '../../ToggleButtonsField';

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
    <ToggleButtonsField
      label={Translation.round}
      buttons={maxRounds === 5 ? fiveButtons : threeButtons}
      value={value?.toString() ?? ''}
      onValueChange={wrappedOnValueChange}
      disabled={disabled}
    />
  );
};

const threeButtons: ToggleButtonsFieldProps['buttons'] = [
  {
    value: '1',
    icon: 'numeric-1',
  },
  {
    value: '2',
    icon: 'numeric-2',
  },
  {
    value: '3',
    icon: 'numeric-3',
  },
];

const fiveButtons: ToggleButtonsFieldProps['buttons'] = [
  ...threeButtons,
  { value: '4', icon: 'numeric-4' },
  { value: '5', icon: 'numeric-5' },
];

const convertFromStringValue = (
  val: string,
  maxRounds: 3 | 5,
): FightResultRoundFieldValue => {
  const numVal = Number(val);
  if (isRound(numVal)) return numVal > maxRounds ? maxRounds : numVal;
  return null;
};
