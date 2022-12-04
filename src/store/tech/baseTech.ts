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
import { JobNames } from '../zone/jobs/jobNames';
import { ActionNames } from '../zone/actions/actionNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
export abstract class BaseTech extends ExtendedModel(Unlockable, {
  id: idProp,
  power: tProp(types.number, 0),
  active: tProp(types.boolean, false),
}) {
  /**
   * For reflection purposes
   */
  abstract name: TechNames;

  /**
   * The name shown to user
   */
  abstract displayName: string;

  /**
   * Description or splash text
   */
  abstract description: string;

  /**
   * How much power the tech costs
   */
  abstract powerCost: number;

  /**
   * What tech is unlocked by this tech
   *
   * Note that techs do not unlock until all dependencies are satisfied!!
   */
  abstract techUnlocked: TechNames[];

  /**
   * What actions are unlocked by this tech
   */
  abstract actionsUnlocked: ActionNames[];

  /**
   * What jobs are unlocked by this tech
   */
  abstract jobsUnlocked: JobNames[];

  /**
   * What buildings are unlocked by this tech
   */
  abstract buildingsUnlocked: BuildingNames[];

  /**
   * Responsible for managing when tech is unlocked
   */
  observableUnlockCheck = () => {
    const techThatUnlocksThisTech = getTech(this).asArray.filter((tech) => {
      const unlocked = tech.techUnlocked;
    });
    return true;
  };

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
