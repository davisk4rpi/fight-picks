import { Layout } from '../../constants';

export const ThemeSpacing = {
  base: 6,
  get horizontalScreen() {
    return Layout.isSmallDevice ? this.base * 3 : this.base * 2;
  },
  get verticalScreen() {
    return this.base * 2;
  },
} as const;
