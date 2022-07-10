import {
  findParent,
  model,
  Model,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { Zone } from '../zone';
import { computed } from 'mobx';
import { getActions } from '../actions/actions';
import { getTech } from '../../tech/tech';

@model('Power')
export class Power extends Model({
  unlocked: tProp(types.boolean, false),
}) {
  /**
   * Total power production
   */
  @computed
  get production(): number {
    return getActions(this).asArray.reduce((total, action) => {
      return total + action.powerProduction;
    }, 0);
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
  get satisfaction(): number {
    if (this.production === 0) return 0;
    if (this.production > this.demand) return 1;
    return this.production / this.demand;
  }

  /**
   * Runs an unlock check.
   */
  @modelAction
  unlockCheck(): void {
    if (!this.unlocked) {
      this.unlocked = this.production > 0 || this.demand > 0;
    }
  }
}

export const getPower = (child: object): Power => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getZone');
  return zone.power;
};
