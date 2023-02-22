import merge from 'deepmerge';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
  MD3Theme as PaperTheme,
  useTheme as usePaperTheme,
} from 'react-native-paper';

import { DarkThemeColors, LightThemeColors } from './colors';
import { ThemeElevation } from './elevation';

export type AppTheme = PaperTheme & {
  elevation: typeof ThemeElevation;
  isDarkTheme: boolean;
};

const extraLightTheme = {
  roundness: 6,
  elevation: ThemeElevation,
  colors: LightThemeColors,
  isDarkTheme: false,
};

const extraDarkTheme = {
  roundness: 6,
  elevation: ThemeElevation,
  colors: DarkThemeColors,
  isDarkTheme: true,
};

export const LightTheme: AppTheme = merge(PaperLightTheme, extraLightTheme);
export const DarkTheme: AppTheme = merge(PaperDarkTheme, extraDarkTheme);

export const useTheme = () => usePaperTheme<AppTheme>();
