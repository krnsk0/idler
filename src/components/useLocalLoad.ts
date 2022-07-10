import { useEffect } from 'react';
import { useStore } from '../store/Provider';

export const useLocalLoad = () => {
  const root = useStore();

  useEffect(() => {
    root.load();
  }, []);
};
