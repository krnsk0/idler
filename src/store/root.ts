import {
  findParent,
  model,
  Model,
  modelAction,
  tProp,
  types,
  getSnapshot,
  fromSnapshot,
} from 'mobx-keystone';
import { Debug } from './debug/debug';
import { Gui } from './gui/gui';
import { Game } from './game';

@model('Root')
export class Root extends Model({
  game: tProp(types.model(Game), () => new Game({})),
  debug: tProp(types.model(Debug), () => new Debug({})),
  gui: tProp(types.model(Gui), () => new Gui({})),
}) {
  @modelAction
  save(): void {
    const savegame = JSON.stringify(getSnapshot(this.game));
    localStorage.setItem('save', savegame);
  }

  @modelAction
  load() {
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

  @modelAction
  reset(): void {
    this.game = new Game({});
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
