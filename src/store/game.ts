import {
  findParent,
  model,
  Model,
  modelAction,
  prop,
  Ref,
  rootRef,
  tProp,
  types,
} from 'mobx-keystone';
import { computed } from 'mobx';

import { Zone } from './zone/zone';
import { Tech } from './tech/tech';
import { Root } from './root';

const initialZoneName = 'landing zone';

const zoneRef = rootRef<Zone>('zone_ref', {});

@model('Game')
export class Game extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
  tech: tProp(types.model(Tech), () => new Tech({})),
  selectedZoneRef: prop<Ref<Zone> | undefined>(),
}) {
  @computed
  get selectedZone(): Zone | undefined {
    return this.selectedZoneRef ? this.selectedZoneRef.current : undefined;
  }

  @computed
  get initialZone(): Zone {
    return this.zones[0];
  }

  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }

  @modelAction
  selectZone(zone: Zone | undefined) {
    this.selectedZoneRef = zone ? zoneRef(zone) : undefined;
  }
}

export const getGame = (child: object): Game => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no game model found in getGame');
  return root.game;
};
