import { model, ExtendedModel } from 'mobx-keystone';
import { computed } from 'mobx';

import { ZoneEntity } from '../zoneEntity';
import { getActions, getBuildings, getTech } from '../../selectors';

@model('Power')
export class Power extends ExtendedModel(ZoneEntity, {}) {
  transientUnlockCheck = () => this.production > 0;
  observableUnlockCheck = () => true;

  /**
   * Total power production
   */
  @computed
  get production(): number {
    const actionsProduction = getActions(this).asArray.reduce(
      (total, action) => {
        return total + action.powerProduction;
      },
      0,
    );

    const buildingsProduction = getBuildings(this).asArray.reduce(
      (total, building) => {
        return total + building.powerProduction;
      },
      0,
    );

    return actionsProduction + buildingsProduction;
  }

  /**
   * Total power consumption
   */
  @computed
  get demand(): number {
    const actionsConsumption = getActions(this).asArray.reduce(
      (total, action) => {
        return total + action.powerConsumption;
      },
      0,
    );

    const techConsumption = getTech(this).selectedTech ? 1 : 0;
    return actionsConsumption + techConsumption;
  }

  /**
   * Satisfaction
   */
  @computed
  get satisfaction(): number {
    if (this.production === 0) return 0;
    if (this.production > this.demand) return 1;
    return this.production / this.demand;
  }

  /**
   * Are we in a total power outage
   */
  @computed
  get blackout(): boolean {
    return this.demand > 0 && this.production === 0;
  }
}
