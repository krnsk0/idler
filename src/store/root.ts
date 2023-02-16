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
} from 'mobx-keystone';
import { computed } from 'mobx';

import { Debug } from './debug/debug';
import { Gui } from './gui/gui';
import { Game } from './game';
import { CURRENT_SAVE_VERSION } from './metadata';
import { migrator } from './migrator/migrator';

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
  loadFromString(savegame: string | null) {
    if (!savegame) {
      this.game.selectZone(this.game.initialZone);
      return;
    }
    this.game = migrator(savegame, CURRENT_SAVE_VERSION);
  }

  @modelAction
  loadFromLocalstorage() {
    try {
      const savegame = localStorage.getItem('save');
      this.loadFromString(savegame);
    } catch (error) {
      console.error('error applying snapshot', error);
    }
  }

  @modelFlow
  loadFromClipboard = _async(function* (this: Root) {
    try {
      const savegame = yield navigator.clipboard.readText();
      this.loadFromString(savegame);
    } catch (error) {
      console.error('error applying snapshot', error);
      return false;
    }
    return true;
  });

  @modelAction
  reset(): void {
    this.game = fromSnapshot(Game, {});
    this.game.selectZone(this.game.initialZone);
  }
}

export const getRoot = (child: object): Root => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no root model found in getRoot');
  return root;
};
