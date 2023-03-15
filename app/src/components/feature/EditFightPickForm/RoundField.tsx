import React from 'react';

import { SegmentedButtonsField, SegmentedButtonsFieldProps } from '../..';
import { Translation } from '../../../app-context';

interface RoundFieldProps {
  value: string;
  onValueChange: (val: string) => void;
  maxRounds: 3 | 5;
  disabled?: boolean;
}

export const RoundField = ({
  value,
  onValueChange,
  maxRounds,
  disabled = false,
}: RoundFieldProps) => {
  return (
    <SegmentedButtonsField
      label={Translation.round}
      buttons={maxRounds === 5 ? fiveButtons : threeButtons}
      value={disabled ? '' : value}
      onValueChange={onValueChange}
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
