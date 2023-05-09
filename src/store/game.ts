import {
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
import { SystemRegistry } from './systemRegistry';
import { Metadata } from './metadata';
import { Turrets } from './turrets/turrets';
import { Enemies } from './enemies/enemies';

const initialZoneName = 'landing zone';

const zoneRef = rootRef<Zone>('zone_ref', {});

export enum ColorThemes {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

@model('Game')
export class Game extends Model({
  systemRegistry: tProp(
    types.model(SystemRegistry),
    () => new SystemRegistry({}),
  ),
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
  tech: tProp(types.model(Tech), () => new Tech({})),
  turrets: tProp(types.model(Turrets), () => new Turrets({})),
  enemies: tProp(types.model(Enemies), () => new Enemies({})),
  selectedZoneRef: prop<Ref<Zone> | undefined>(),
  metadata: tProp(types.model(Metadata), () => new Metadata({})),
  colorTheme: tProp(types.enum(ColorThemes), ColorThemes.LIGHT).withSetter(),
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
