import {
  modelAction,
  ExtendedModel,
  tProp,
  types,
  idProp,
} from 'mobx-keystone';
import { ZoneEntity } from '../zone/zoneEntity';
import { TechNames } from './techNames';
import { computed } from 'mobx';

export abstract class BaseTech extends ExtendedModel(ZoneEntity, {
  id: idProp,
  unlocked: tProp(types.boolean, false),
  power: tProp(types.number, 0),
  active: tProp(types.boolean, false),
}) {
  abstract name: TechNames;
  abstract displayName: string;
  abstract description: string;
  abstract unlockWhen: () => boolean;
  abstract powerCost: number;

  /**
   * Progress for selected tech
   */
  @computed
  get progress(): number {
    return this.power / this.powerCost;
  }

  /**
   * Runs an unlock check
   */
  @modelAction
  unlockCheck(): void {
    if (!this.unlocked) {
      this.unlocked = this.unlockWhen();
    }
  }
}
