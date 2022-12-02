import { useEffect } from 'react';
import { useStore } from '../store/Provider';

export const useStoreTick = () => {
  const root = useStore();

  useEffect(() => {
    let lastTimestamp: number | undefined = undefined;
    const onAnimationFrame = (timestamp: DOMHighResTimeStamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      root.game.systemRegistry.executeTick(delta);

      window.requestAnimationFrame(onAnimationFrame);
    };
    window.requestAnimationFrame(onAnimationFrame);
  }, []);
};
