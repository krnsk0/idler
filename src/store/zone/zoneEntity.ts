import { ExtendedModel } from 'mobx-keystone';
import { computed } from 'mobx';
import { Zone } from './zone';
import { Resources } from './resources/resources';
import { Buildings } from './buildings/buildings';
import { Jobs } from './jobs/jobs';
import { Unlockable } from '../unlockable';
import { getZone } from '../selectors';
import { Upgrades } from './upgrades/upgrades';
import { Perimeter } from './perimeter/perimeter';

export abstract class ZoneEntity extends ExtendedModel(Unlockable, {}) {
  /**
   * The zone associated with the entity
   */
  @computed
  get zone(): Zone {
    return getZone(this);
  }

  /**
   * The zone associated with the entity
   */
  @computed
  get zoneResources(): Resources {
    return getZone(this).resources;
  }

  /**
   * The buildings associated with the entity's zone
   */
  @computed
  get zoneBuildings(): Buildings {
    return getZone(this).buildings;
  }
  /**
   * The jobs associated with the entity's zone
   */
  @computed
  get zoneJobs(): Jobs {
    return getZone(this).jobs;
  }

  /**
   * The upgrades associated with the entity's zone
   */
  @computed
  get zoneUpgrades(): Upgrades {
    return getZone(this).upgrades;
  }

  /**
   * The perimiter asociated with the entity's zone
   */
  @computed
  get zonePerimeter(): Perimeter {
    return getZone(this).perimeter;
  }
}
