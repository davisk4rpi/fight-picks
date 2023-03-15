import React from 'react';

import { MethodMap } from '@fight-picks/models';

import { SegmentedButtonsField, SegmentedButtonsFieldProps } from '../..';
import { Translation } from '../../../app-context';

interface MethodFieldProps {
  value: string;
  onValueChange: (val: string) => void;
}

export const MethodField = ({ value, onValueChange }: MethodFieldProps) => {
  return (
    <SegmentedButtonsField
      label={Translation.method}
      buttons={methodButtons}
      value={value}
      onValueChange={onValueChange}
    />
  );
};

const methodButtons: SegmentedButtonsFieldProps['buttons'] = [
  {
    value: MethodMap.decision,
    label: Translation.shorthandMethodOfVictory(MethodMap.decision),
  },
  {
    value: MethodMap.knockout,
    label: Translation.shorthandMethodOfVictory(MethodMap.knockout),
  },
  {
    value: MethodMap.submission,
    label: Translation.shorthandMethodOfVictory(MethodMap.submission),
  },
];
