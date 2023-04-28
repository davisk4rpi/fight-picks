import React from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import {
  Text,
  ToggleButton,
  ToggleButtonProps,
  ToggleButtonRowProps,
} from 'react-native-paper';

import { ThemeSpacing } from '../app-context';

type ToggleButton = {
  value: string;
  icon: ToggleButtonProps['icon'];
};

export type ToggleButtonsFieldProps = Pick<
  ToggleButtonRowProps,
  'value' | 'onValueChange'
> & {
  label?: string;
  disabled?: boolean;
  buttons: ToggleButton[];
};

export const ToggleButtonsField = ({
  label,
  disabled,
  buttons,
  value,
  onValueChange,
}: ToggleButtonsFieldProps) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={disabled ? disabledTextStyle : styles.text}
          variant="titleMedium">
          {label}
        </Text>
      )}
      <ToggleButton.Row onValueChange={onValueChange} value={value}>
        {buttons.map(button => (
          <ToggleButton
            key={button.value}
            disabled={disabled}
            icon={button.icon}
            value={button.value}
            size={28}
          />
        ))}
      </ToggleButton.Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: ThemeSpacing.base,
    alignItems: 'center',
  },
  text: {
    marginBottom: ThemeSpacing.base * 3,
  },
});

const disabledTextStyle = StyleSheet.compose<TextStyle>(styles.text, {
  opacity: 0.38,
});
