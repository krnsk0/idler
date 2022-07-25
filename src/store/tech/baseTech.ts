import { modelAction, Model, tProp, types, idProp } from 'mobx-keystone';
import { ZoneEntity } from '../zone/zoneEntity';
import { TechNames } from './techNames';
import { computed } from 'mobx';
import { getTech } from './tech';
import { TechEffect } from './techEffectTypes';

export abstract class BaseTech extends Model({
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
  abstract effects: TechEffect[];

  /**
   * Progress for selected tech
   */
  @computed
  get progress(): number {
    return this.power / this.powerCost;
  }

  /**
   * Tech is researched when we have enough power
   */
  @computed
  get researched(): boolean {
    return this.power >= this.powerCost;
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

  /**
   * Add power
   */
  @modelAction
  addPower(power: number): void {
    if (this.power + power >= this.powerCost) {
      this.power = this.powerCost;
      getTech(this).selectTech(undefined);
    } else {
      this.power += power;
    }
  }
}
