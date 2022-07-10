import { useEffect } from 'react';
import { useStore } from '../store/Provider';

export const useLocalSave = () => {
  const root = useStore();

  useEffect(() => {
    const id = setInterval(() => {
      root.save();
    }, 1000);

    return () => clearInterval(id);
  }, [root]);
};
