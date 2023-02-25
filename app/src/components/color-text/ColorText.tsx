import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-paper';

import { ThemeColorKey, useTheme } from '../../app-context';

export interface ColorTextProps extends TextProps {
  color?: ThemeColorKey;
}

export const ColorText = ({ color, style, ...props }: ColorTextProps) => {
  const { colors } = useTheme();
  const colorValue = color ? colors[color] : '';
  const colorStyle = useMemo(
    () => StyleSheet.compose(style ?? {}, { color: colorValue }),
    [style, colorValue],
  );
  return <Text {...props} style={color ? colorStyle : style} />;
};
