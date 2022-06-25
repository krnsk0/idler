import { walkTree, WalkTreeMode } from 'mobx-keystone';
import { useEffect } from 'react';
import { useStore } from '../store/Provider';

interface Tickable {
  tick: (delta: number) => void;
}

function isTickable(obj: unknown): obj is Tickable {
  return typeof obj === 'object' && obj !== null && 'tick' in obj;
}

export const useStoreTick = () => {
  const root = useStore();

  useEffect(() => {
    let lastTimestamp: number | undefined = undefined;
    const onAnimationFrame = (timestamp: DOMHighResTimeStamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      walkTree(
        root,
        (node: unknown) => {
          if (isTickable(node)) {
            node.tick(delta);
          }
        },
        WalkTreeMode.ParentFirst,
      );

      window.requestAnimationFrame(onAnimationFrame);
    };
    window.requestAnimationFrame(onAnimationFrame);
  }, []);
};
