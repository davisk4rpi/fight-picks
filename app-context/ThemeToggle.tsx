import React from 'react';
import { Switch } from 'react-native-paper';

import { PreferencesContext } from './PreferencesContext';

export const ThemeToggle = () => {
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  return <Switch value={isThemeDark} onValueChange={toggleTheme} />;
};
