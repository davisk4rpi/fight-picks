import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export type RefTheme = {
  isDarkTheme: boolean;
  colors: {
    primary: string;
    background: string;
    onSurface: string;
    outline: string;
    error: string;
    elevation: {
      level2: string;
    };
  };
};

export const getAdaptedNavigationTheme = (theme: RefTheme) => {
  const navigationTheme = theme.isDarkTheme ? DarkTheme : DefaultTheme;
  return {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.elevation.level2,
      text: theme.colors.onSurface,
      border: theme.colors.outline,
      notification: theme.colors.error,
    },
  };
};
