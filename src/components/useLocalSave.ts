import { useEffect } from 'react';
import { useStore } from '../store/Provider';

export const useLocalSave = () => {
  const root = useStore();

  useEffect(() => {
    const id = setInterval(() => {
      root.saveToLocalstorage();
    }, 100);
    return () => clearInterval(id);
  }, []);
};
