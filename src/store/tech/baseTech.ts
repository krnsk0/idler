import { modelAction, ExtendedModel, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zone/zoneEntity';
import { TechNames } from './techNames';

export abstract class BaseTech extends ExtendedModel(ZoneEntity, {
  unlocked: tProp(types.boolean, false),
  progress: tProp(types.number, 0),
  active: tProp(types.boolean, false),
}) {
  abstract name: TechNames;
  abstract displayName: string;
  abstract description: string;
  abstract unlockWhen: () => boolean;
  abstract powerCost: number;
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
