import { walkTree, WalkTreeMode } from 'mobx-keystone';
import { useEffect } from 'react';
import { useStore } from '../store/Provider';

interface Tickable {
  tick: (delta: number) => void;
}

interface UnlockCheckable {
  unlockCheck: () => void;
}

function isTickable(obj: unknown): obj is Tickable {
  return typeof obj === 'object' && obj !== null && 'tick' in obj;
}

function isUnlockCheckable(obj: unknown): obj is UnlockCheckable {
  return typeof obj === 'object' && obj !== null && 'unlockCheck' in obj;
}

export const useStoreTick = () => {
  const root = useStore();

  useEffect(() => {
    let lastTimestamp: number | undefined = undefined;
    const onAnimationFrame = (timestamp: DOMHighResTimeStamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      walkTree(
        root,
        (node: unknown) => {
          if (isTickable(node)) {
            node.tick(delta * (root.debug.hyperMode ? 100 : 1));
          }
          if (isUnlockCheckable(node)) {
            node.unlockCheck();
          }
        },
        WalkTreeMode.ParentFirst,
      );

      window.requestAnimationFrame(onAnimationFrame);
    };
    window.requestAnimationFrame(onAnimationFrame);
  }, []);
};
