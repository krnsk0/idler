import {
  findParent,
  model,
  Model,
  modelAction,
  tProp,
  types,
  getSnapshot,
  fromSnapshot,
  modelFlow,
  _async,
  walkTree,
  WalkTreeMode,
} from 'mobx-keystone';
import { computed } from 'mobx';

import { Debug } from './debug/debug';
import { Gui } from './gui/gui';
import { Game } from './game';

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

@model('Root')
export class Root extends Model({
  game: tProp(types.model(Game), () => new Game({})),
  debug: tProp(types.model(Debug), () => new Debug({})),
  gui: tProp(types.model(Gui), () => new Gui({})),
}) {
  @computed
  get savegame(): string {
    return JSON.stringify(getSnapshot(this.game));
  }

  @modelAction
  saveToLocalstorage(): void {
    localStorage.setItem('save', this.savegame);
  }

  @modelAction
  saveToClipboard() {
    navigator.clipboard.writeText(this.savegame);
  }

  @modelAction
  loadFromLocalstorage() {
    try {
      const savegame = localStorage.getItem('save');
      if (!savegame) {
        this.game.selectZone(this.game.initialZone);
        return;
      }
      this.game = fromSnapshot(Game, JSON.parse(savegame));
    } catch (error) {
      console.error('error applying snapshot', error);
    }
  }

  @modelFlow
  loadFromClipboard = _async(function* (this: Root) {
    try {
      const savegame = yield navigator.clipboard.readText();
      if (!savegame) {
        this.game.selectZone(this.game.initialZone);
      }
      this.game = fromSnapshot(Game, JSON.parse(savegame));
    } catch (error) {
      console.error('error applying snapshot', error);
      return false;
    }
    return true;
  });

  @modelAction
  reset(): void {
    this.game = new Game({});
    this.game.selectZone(this.game.initialZone);
  }

  @modelAction
  executeTick(delta: number): void {
    walkTree(
      this,
      (node: unknown) => {
        if (isTickable(node)) {
          node.tick(delta * (this.debug.hyperMode ? 100 : 1));
        }
        if (isUnlockCheckable(node)) {
          node.unlockCheck();
        }
      },
      WalkTreeMode.ParentFirst,
    );
  }
}

export const getRoot = (child: object): Root => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no root model found in getRoot');
  return root;
};
