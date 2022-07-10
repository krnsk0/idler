import { useEffect } from 'react';
import { useStore } from '../store/Provider';

export const useLocalLoad = () => {
  const root = useStore();

  useEffect(() => {
    console.log('loading');

    const saveString = localStorage.getItem('save');
    if (saveString) {
      try {
        const savegame = JSON.parse(saveString);
        console.log('savegame: ', savegame);
        root.applySave(savegame);
      } catch (error) {
        console.error('savegame deserialization error', error);
      }
    }
  }, [root]);
};
