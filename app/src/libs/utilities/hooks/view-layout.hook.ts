import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export interface ViewLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

type UseViewLayoutResult = [
  ViewLayout | undefined,
  (e: LayoutChangeEvent) => void,
];

export function useViewLayout(): UseViewLayoutResult {
  const [layout, setLayout] = useState<ViewLayout | undefined>(undefined);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  }, []);

  return [layout, onLayout];
}
