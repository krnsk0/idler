import LogRocket from 'logrocket';
import { useEffect } from 'react';
import { useLocalstorageState } from 'rooks';
import { nanoid } from 'nanoid';

export const useUser = () => {
  const [userId] = useLocalstorageState(
    'userId',
    import.meta.env.DEV ? 'DEVELOPER' : nanoid(),
  );

  useEffect(() => {
    LogRocket.identify(userId, { name: userId });
  }, [userId]);
};
