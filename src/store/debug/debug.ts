import {
  getRoot,
  model,
  Model,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { getGame, getTech } from '../selectors';
import { TechNames } from '../tech/techNames';
import { ActionNames } from '../zone/actions/actionNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { JobNames } from '../zone/jobs/jobNames';
import { ResourceNames } from '../zone/resources/resourceNames';

@model('Debug')
export class Debug extends Model({
  hyperMode: tProp(types.boolean, false),
}) {
  @modelAction
  toggleHyperMode() {
    this.hyperMode = !this.hyperMode;
  }

  @modelAction
  enableHyper() {
    this.hyperMode = true;
  }

  /**
   * Get us to max farms
   */
  @modelAction
  phaseOne() {
    getRoot(this).reset();
    const initialZone = getGame(this).initialZone;
    const tech = getTech(this);
    initialZone.resources[ResourceNames.BIOMASS].cheat();
    initialZone.actions[ActionNames.GENERATE]._unlockTime = Date.now();
    initialZone.power._unlockTime = Date.now();
    tech[TechNames.BIOMASS_COMPRESSION].cheat();
    initialZone.resources[ResourceNames.LUMBER].cheat();
    tech[TechNames.FARMING].cheat();
    initialZone.buildings[BuildingNames.FARM].cheat(6);
  }

  /**
   * Max buildings, unlock jobs
   */
  @modelAction
  phaseTwo() {
    this.phaseOne();
    const tech = getTech(this);
    const initialZone = getGame(this).initialZone;
    // tech[TechNames.AGROFORESTRY].cheat();
    // tech[TechNames.SHELTER].cheat();
    // tech[TechNames.CRYONICS].cheat();
    // initialZone.buildings[BuildingNames.HABITAT].cheat(5);
    // initialZone.resources[ResourceNames.COLONISTS].cheat(5);
    // for (let i = 0; i < 5; i += 1) {
    //   initialZone.jobs[JobNames.ARBORIST].assign();
    // }
    //
    // initialZone.resources[ResourceNames.NUTRIENTS].cheat();
    // initialZone.resources[ResourceNames.BIOMASS].cheat();
    // initialZone.resources[ResourceNames.LUMBER].cheat();
  }

  @modelAction
  phaseThree() {
    this.phaseTwo();
    const tech = getTech(this);
    const initialZone = getGame(this).initialZone;
    // tech[TechNames.EXCAVATION].cheat();
    // tech[TechNames.STORAGE].cheat();
    // tech[TechNames.METALLURGY].cheat();
    // initialZone.resources[ResourceNames.ROCK].cheat();
    // initialZone.resources[ResourceNames.ORE].cheat();
    // initialZone.buildings[BuildingNames.CACHE].cheat(3);
    // initialZone.buildings[BuildingNames.FURNACE].cheat(2);
    // initialZone.resources[ResourceNames.ALLOY].cheat();
  }

  /**
   * Put stuff here to get game in state to repro bugs
   */
  @modelAction
  debug() {
    this.phaseTwo();
  }
}
