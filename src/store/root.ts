import {
  model,
  Model,
  modelAction,
  tProp,
  types,
  getSnapshot,
  modelFlow,
  _async,
  fromSnapshot,
} from 'mobx-keystone';
import { computed } from 'mobx';

import { Debug } from './debug/debug';
import { Gui } from './gui/gui';
import { Game } from './game';
import { migrateToCurrentVersion } from './migrator/migrateToCurrentVersion';
import { makeNewGame } from './migrator/makeNewGame';
import { ensureFirstZoneIsSelected } from './migrator/ensureFirstZoneIsSelected';
import { ZoneTabNames } from './zone/zone';

export function migrator(gameJson: any, currentSaveVersion: string): Game {
  return ensureFirstZoneIsSelected(
    fromSnapshot(Game, migrateToCurrentVersion(gameJson, currentSaveVersion)),
  );
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
    console.log('attempting to load save from localstorage...');
    const savegame = localStorage.getItem('save');
    try {
      if (!savegame) return this.hardReset();
      let gameJson = JSON.parse(savegame);
      this.game = migrator(gameJson, APP_VERSION);
      console.log('save loaded');
    } catch (error: unknown) {
      console.error('error loading from localstorage', {
        error,
        savegame,
      });
      this.hardReset();
    }
  }

  @modelFlow
  loadFromClipboard = _async(function* (this: Root) {
    const savegame = yield navigator.clipboard.readText();
    try {
      let gameJson = JSON.parse(savegame);
      this.game = migrator(gameJson, APP_VERSION);
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
  hardReset(): void {
    console.log('resetting game state');
    const oldTheme = this.game.colorTheme;
    this.game = makeNewGame({
      currentSaveVersion: APP_VERSION,
      colorTheme: oldTheme,
    });
    this.gui = new Gui({});
    this.game.zones[0].selectTab(ZoneTabNames.ACTIONS);
  }
}
