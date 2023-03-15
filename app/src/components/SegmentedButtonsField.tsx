import React, { useMemo } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import {
  SegmentedButtons,
  SegmentedButtonsProps,
  Text,
} from 'react-native-paper';

import { ThemeSpacing } from '../app-context';

export type SegmentedButtonsFieldProps = SegmentedButtonsProps & {
  label?: string;
  disabled?: boolean;
};

export const SegmentedButtonsField = ({
  label,
  disabled,
  buttons,
  ...segmentedButtonsProps
}: SegmentedButtonsFieldProps) => {
  const newButtons = useMemo(() => {
    if (disabled)
      return buttons.map(button => {
        return { ...button, disabled: true };
      });
    return buttons;
  }, [disabled, buttons]);

  const textStyle = useMemo(() => {
    if (disabled) {
      return StyleSheet.compose<TextStyle>(styles.text, {
        opacity: 0.38,
      });
    }
    return styles.text;
  }, [disabled]);
  return (
    <View style={styles.container}>
      {label && (
        <Text style={textStyle} variant="titleSmall">
          {label}
        </Text>
      )}
      <SegmentedButtons buttons={newButtons} {...segmentedButtonsProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: ThemeSpacing.base,
  },
  text: {
    marginBottom: ThemeSpacing.base * 3,
  },
});
