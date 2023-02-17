import {
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
import { migrator } from './migrator/migrator';
import { makeNewGame } from './migrator/makeNewGame';

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
    console.log('attempting to load save from localstorage...');
    const savegame = localStorage.getItem('save');
    try {
      if (!savegame) return this.reset();
      this.game = migrator(savegame, import.meta.env.PACKAGE_VERSION);
      console.log('save loaded');
    } catch (error: unknown) {
      console.error('error loading from localstorage', {
        error,
        savegame,
      });
      this.reset();
    }
  }

  @modelFlow
  loadFromClipboard = _async(function* (this: Root) {
    const savegame = yield navigator.clipboard.readText();
    try {
      this.game = migrator(savegame, import.meta.env.PACKAGE_VERSION);
    } catch (error: unknown) {
      console.error('error loading from clipboard', {
        error,
        savegame,
      });
      return false;
    }
    return true;
  });

  @modelAction
  reset(): void {
    console.log('resetting game state');
    this.game = makeNewGame(import.meta.env.PACKAGE_VERSION);
  }
}
