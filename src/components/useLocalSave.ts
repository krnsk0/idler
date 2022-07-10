import { useEffect } from 'react';
import { useStore } from '../store/Provider';

export const useLocalSave = () => {
  const root = useStore();

  useEffect(() => {
    const id = setInterval(() => {
      console.log('saving');
      localStorage.setItem('save', JSON.stringify(root.savegame));
    }, 1000);

    return () => clearInterval(id);
  }, [root]);
};
