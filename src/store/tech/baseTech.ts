import {
  modelAction,
  ExtendedModel,
  tProp,
  types,
  idProp,
} from 'mobx-keystone';
import { TechNames } from './techNames';
import { computed } from 'mobx';
import { getTech } from './tech';
import { Unlockable } from '../unlockable';
export abstract class BaseTech extends ExtendedModel(Unlockable, {
  id: idProp,
  power: tProp(types.number, 0),
  active: tProp(types.boolean, false),
}) {
  abstract name: TechNames;
  abstract displayName: string;
  abstract description: string;
  abstract powerCost: number;

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
   * Immediately research; useful mainly for debug
   */
  @modelAction
  cheat(): void {
    console.log(`CHEAT: RESEARCHING ${this.name}`);
    this.power = this.powerCost;
    getTech(this).selectTech(undefined);
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
