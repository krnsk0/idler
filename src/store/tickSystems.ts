import { findParent, Model, model, modelAction } from 'mobx-keystone';
import { getDebug } from './debug/debug';
import { Root } from './root';

interface Tickable {
  tick: (delta: number) => void;
}

interface Unlockable {
  unlockCheck: () => void;
}

function isTickable(obj: unknown): obj is Tickable {
  return typeof obj === 'object' && obj !== null && 'tick' in obj;
}

function isUnlockable(obj: unknown): obj is Unlockable {
  return typeof obj === 'object' && obj !== null && 'unlockCheck' in obj;
}

@model('TickSystems')
export class TickSystems extends Model({}) {
  tickables = new Set<Tickable>();
  unlockables = new Set<Unlockable>();

  @modelAction
  printSystems(): void {
    this.tickables.forEach((model: any) => {
      console.log('TICKABLE:', (model as any).$modelType);
    });
    this.unlockables.forEach((model: any) => {
      console.log('UNLOCKABLE:', (model as any).$modelType);
    });
  }

  @modelAction
  registerModel(model: object) {
    if (isTickable(model)) {
      this.tickables.add(model);
    }
    if (isUnlockable(model)) {
      this.unlockables.add(model);
    }
  }

  @modelAction
  deregisterModel(model: object) {
    if (isTickable(model)) {
      this.tickables.delete(model);
    }
    if (isUnlockable(model)) {
      this.unlockables.delete(model);
    }
  }

  /**
   * Helper that applies a delta to the tree
   */
  @modelAction
  _executeTick(delta: number): void {
    this.tickables.forEach((model: any) => {
      model.tick(delta);
    });
    this.unlockables.forEach((model: any) => {
      model.unlockCheck();
    });
  }

  /**
   * If a tick is too long, break it up to run as a batch
   */
  @modelAction
  executeTick(time: number): void {
    let timeRemaining = time * (getDebug(this).hyperMode ? 10 : 1);

    // longest allowable tick length
    const longestTick = 1;
    if (timeRemaining > longestTick) {
      console.log('breaking up long tick of length', time);
    }
    while (timeRemaining > longestTick) {
      this._executeTick(longestTick);
      timeRemaining -= longestTick;
    }
    this._executeTick(timeRemaining);
  }
}

export const getTickSystems = (child: object): TickSystems => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no game model found in getGame');
  return root.game.tickSystems;
};
