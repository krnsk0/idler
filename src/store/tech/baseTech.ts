import {
  modelAction,
  ExtendedModel,
  tProp,
  types,
  idProp,
} from 'mobx-keystone';
import { TechNames } from './techNames';
import { computed } from 'mobx';
import { getTech } from '../selectors';
import { Unlockable } from '../unlockable';
import { JobNames } from '../zone/jobs/jobNames';
import { ActionNames } from '../zone/actions/actionNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { UpgradeNames } from '../zone/upgrades/upgradeNames';
import { TurretNames } from '../zone/perimeter/turrets/turretNames';
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
  techUnlocked: TechNames[] = [];

  /**
   * What actions are unlocked by this tech
   */
  actionsUnlocked: ActionNames[] = [];

  /**
   * Actions which get locked by researching this
   */
  actionsRelocked: ActionNames[] = [];

  /**
   * What jobs are unlocked by this tech
   */
  jobsUnlocked: JobNames[] = [];

  /**
   * What buildings are unlocked by this tech
   */
  buildingsUnlocked: BuildingNames[] = [];

  /**
   * What upgrades are unlocked by this tech
   */
  upgradesUnlocked: UpgradeNames[] = [];

  /**
   * What turrets are unlocked by this tech
   */
  turretsUnlocked: TurretNames[] = [];

  /**
   * Responsible for managing when tech is unlocked
   */
  observableUnlockCheck = () => {
    const techThatUnlocksThisTech: BaseTech[] = [];
    getTech(this).asArray.forEach((tech) => {
      tech.techUnlocked.forEach((childTech) => {
        if (childTech === this.name) {
          techThatUnlocksThisTech.push(tech);
        }
      });
    });
    return techThatUnlocksThisTech.every((tech) => tech.researched);
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
