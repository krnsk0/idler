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
} from 'mobx-keystone';
import { computed } from 'mobx';
import { Debug } from './debug/debug';
import { Zone } from './zone/zone';
import { Tech } from './tech/tech';
import { Gui } from './gui/gui';

const initialZoneName = 'Landing Zone';

interface Savegame {
  tech: SnapshotOutOfModel<Tech>;
  zones: Array<SnapshotOutOfModel<Zone>>;
}

@model('Root')
export class Root extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
  tech: tProp(types.model(Tech), () => new Tech({})),
  debug: tProp(types.model(Debug), () => new Debug({})),
  gui: tProp(types.model(Gui), () => new Gui({})),
}) {
  @computed
  get savegame(): Savegame {
    return {
      zones: getSnapshot(this.zones),
      tech: getSnapshot(this.tech),
    };
  }

  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }

  @modelAction
  applySave(savegame: Savegame) {
    try {
      applySnapshot(this.zones, savegame.zones);
      applySnapshot(this.tech, savegame.tech);
    } catch (error) {
      console.log('savegame snapshot application', error);
    }
  }
}

export const getRoot = (child: object): Root => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no root model found in getRoot');
  return root;
};
