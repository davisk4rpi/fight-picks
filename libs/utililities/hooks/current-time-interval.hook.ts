import { useCallback, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

// TODO since this uses `@react-navigation/native` determine whether this should be in utilities or if it should be refactored
export const useCurrentTimeInterval = (intervalMs = 1000) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      const updateCurrentTime = () => {
        setCurrentTime(new Date());
      };
      updateCurrentTime();
      const interval = setInterval(updateCurrentTime, intervalMs);
      return () => clearInterval(interval);
    }, [intervalMs]),
  );

  return currentTime;
};
