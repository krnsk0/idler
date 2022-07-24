import { Model } from 'mobx-keystone';
import { computed } from 'mobx';
import { Zone, getZone } from './zone';
import { Resources } from './resources/resources';
import { Buildings } from './buildings/buildings';
import { Jobs } from './jobs/jobs';

export abstract class ZoneEntity extends Model({}) {
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
   * The buildings associated with the entity
   */
  @computed
  get zoneBuildings(): Buildings {
    return getZone(this).buildings;
  }
  /**
   * The jobs associated with the entity
   */
  @computed
  get zoneJobs(): Jobs {
    return getZone(this).jobs;
  }
}
