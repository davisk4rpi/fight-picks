import { isConfidence } from '@fight-picks/models';
import React, { useCallback } from 'react';

import { SegmentedButtonsField, SegmentedButtonsFieldProps } from '../..';
import { Translation } from '../../../app-context';
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
    <SegmentedButtonsField
      label={Translation.confidence}
      buttons={confidenceButtons}
      value={value?.toString() ?? ''}
      onValueChange={wrappedOnValueChange}
    />
  );
};

const confidenceButtons: SegmentedButtonsFieldProps['buttons'] = [
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
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
];

const convertFromStringValue = (val: string): FightPickConfidenceFieldValue => {
  const numVal = Number(val);
  if (isConfidence(numVal)) return numVal;
  return null;
};
