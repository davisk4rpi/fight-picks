import React, { useCallback } from 'react';
import { Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { Translation } from '../../../app-context';
import { selectCurrentUser, useAppSelector } from '../../../data-access/store';

export const useAdminFeatures = (fightId: string) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { navigate } = useNavigation();

  const handlePress = useCallback(() => {
    navigate('EditFightResult', { fightId });
  }, [navigate, fightId]);

  const editFightResultButton = (
    <Button onPress={handlePress}>{Translation.editResult}</Button>
  );
  return {
    editFightResultButton: currentUser?.isAdmin ? editFightResultButton : null,
  };
};
