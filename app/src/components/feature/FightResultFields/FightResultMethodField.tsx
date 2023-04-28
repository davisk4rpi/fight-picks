import React, { useCallback } from 'react';

import { isMethod, Method, MethodMap } from '@fight-picks/models';

import { Translation } from '../../../app-context';
import {
  SegmentedButtonsField,
  SegmentedButtonsFieldProps,
} from '../../SegmentedButtonsField';

export type FightResultMethodFieldValue = Method | null;
type FightResultMethodFieldProps = {
  value: FightResultMethodFieldValue;
  onValueChange: (val: FightResultMethodFieldValue) => void;
  fightPickOptionsOnly?: boolean;
};

export const FightResultMethodField = ({
  value,
  onValueChange,
  fightPickOptionsOnly,
}: FightResultMethodFieldProps) => {
  const wrappedOnValueChange = useCallback(
    (val: string) => {
      onValueChange(convertFromStringValue(val));
    },
    [onValueChange],
  );

  return (
    <>
      <SegmentedButtonsField
        label={Translation.method}
        buttons={fightPickMethodButtons}
        value={value ?? ''}
        onValueChange={wrappedOnValueChange}
      />
      {!fightPickOptionsOnly && (
        <SegmentedButtonsField
          buttons={otherMethodButtons}
          value={value ?? ''}
          onValueChange={wrappedOnValueChange}
        />
      )}
    </>
  );
};
const fightPickMethodButtons: SegmentedButtonsFieldProps['buttons'] = [
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

const otherMethodButtons: SegmentedButtonsFieldProps['buttons'] = [
  {
    value: MethodMap.draw,
    label: Translation.shorthandMethodOfVictory(MethodMap.draw),
  },
  {
    value: MethodMap.disqualification,
    label: Translation.shorthandMethodOfVictory(MethodMap.disqualification),
  },
  {
    value: MethodMap.no_contest,
    label: Translation.shorthandMethodOfVictory(MethodMap.no_contest),
  },
];

const convertFromStringValue = (val: string): FightResultMethodFieldValue => {
  if (isMethod(val)) return val;
  return null;
};
