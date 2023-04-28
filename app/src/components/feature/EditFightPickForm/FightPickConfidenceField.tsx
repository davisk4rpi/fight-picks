import { isConfidence } from '@fight-picks/models';
import React, { useCallback } from 'react';

import { Translation } from '../../../app-context';
import {
  ToggleButtonsField,
  ToggleButtonsFieldProps,
} from '../../ToggleButtonsField';
import { FightPickConfidenceFieldValue } from './types';

interface FightPickConfidenceFieldProps {
  value: FightPickConfidenceFieldValue;
  onValueChange: (val: FightPickConfidenceFieldValue) => void;
}

export const FightPickConfidenceField = ({
  value,
  onValueChange,
}: FightPickConfidenceFieldProps) => {
  const wrappedOnValueChange = useCallback(
    (val: string) => onValueChange(convertFromStringValue(val)),
    [onValueChange],
  );
  return (
    <ToggleButtonsField
      label={Translation.confidence}
      buttons={confidenceButtons}
      value={value?.toString() ?? ''}
      onValueChange={wrappedOnValueChange}
    />
  );
};

const confidenceButtons: ToggleButtonsFieldProps['buttons'] = [
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
  {
    value: '4',
    icon: 'numeric-4',
  },
  {
    value: '5',
    icon: 'numeric-5',
  },
];

const convertFromStringValue = (val: string): FightPickConfidenceFieldValue => {
  const numVal = Number(val);
  if (isConfidence(numVal)) return numVal;
  return null;
};
