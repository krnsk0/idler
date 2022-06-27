import { Model, decoratedModel, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { Zone, getZone } from './zone';
import { Resources } from './resources/resources';
import { Buildings } from './buildings/buildings';

abstract class _ZoneEntity extends Model({}) {
  /**
   * The zone associated with the entity
   */
  get zone(): Zone {
    return getZone(this);
  }

  /**
   * The zone associated with the entity
   */
  get zoneResources(): Resources {
    return getZone(this).resources;
  }

  /**
   * The buildings associated with the entity
   */
  get zoneBuildings(): Buildings {
    return getZone(this).buildings;
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const ZoneEntity = decoratedModel(undefined, _ZoneEntity, {
  zone: computed,
  zoneResources: computed,
});
