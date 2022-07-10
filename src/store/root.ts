import {
  applySnapshot,
  findParent,
  model,
  Model,
  modelAction,
  SnapshotOutOf,
  tProp,
  types,
  getSnapshot,
  SnapshotOutOfModel,
  fromSnapshot,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { Debug } from './debug/debug';
import { Zone } from './zone/zone';
import { Tech } from './tech/tech';
import { Gui } from './gui/gui';

const initialZoneName = 'Landing Zone';

@model('Root')
export class Root extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
  tech: tProp(types.model(Tech), () => new Tech({})),
  debug: tProp(types.model(Debug), () => new Debug({})),
  gui: tProp(types.model(Gui), () => new Gui({})),
}) {
  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }

  @modelAction
  save(): void {
    const savegame = JSON.stringify(getSnapshot(this));
    localStorage.setItem('save', savegame);
  }

  @modelAction
  load() {
    try {
      const savegame = localStorage.getItem('save');
      if (!savegame) return;
      applySnapshot(this, JSON.parse(savegame));
    } catch (error) {
      console.error('error applying snapshot', error);
    }
  }

  @modelAction
  reset(): void {
    this.zones = [new Zone({ name: initialZoneName })];
    this.tech = new Tech({});
    this.debug = new Debug({});
    this.gui = new Gui({});
  }
}

export const getRoot = (child: object): Root => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no root model found in getRoot');
  return root;
};
