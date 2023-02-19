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

    // unlock powr and tech
    initialZone.actions[ActionNames.GENERATE]._unlockTime = Date.now();
    initialZone.power._unlockTime = Date.now();
    initialZone.resources[ResourceNames.BIOMASS].cheat();

    // manual wood max
    tech[TechNames.BIOMASS_COMPRESSION].cheat();
    initialZone.resources[ResourceNames.LUMBER].cheat();

    // farms max
    tech[TechNames.FARMING].cheat();
    initialZone.buildings[BuildingNames.FARM].cheat(5);
    initialZone.resources[ResourceNames.NUTRIENTS].cheat();
  }

  /**
   * Max all buildings prior to building caches
   * Max out jobs
   */
  @modelAction
  phaseTwo() {
    this.phaseOne();
    const tech = getTech(this);
    const initialZone = getGame(this).initialZone;

    // shelter max
    tech[TechNames.SHELTER].cheat();
    initialZone.buildings[BuildingNames.HABITAT].cheat(8);

    // excavation max
    tech[TechNames.EXCAVATION].cheat();
    initialZone.resources[ResourceNames.ROCK].cheat();
    initialZone.resources[ResourceNames.ORE].cheat();

    // tree farms max
    tech[TechNames.FORESTRY].cheat();
    initialZone.buildings[BuildingNames.TREE_FARM].cheat(4);

    // furnace max
    tech[TechNames.METALLURGY].cheat();
    initialZone.buildings[BuildingNames.FURNACE].cheat(2);
    initialZone.resources[ResourceNames.ALLOY].cheat();

    // unlock jobs, get colonists, balance
    tech[TechNames.CRYONICS].cheat();
    tech[TechNames.AGRONOMY].cheat();
    tech[TechNames.ARBORICULTURE].cheat();
    initialZone.resources[ResourceNames.COLONISTS].cheat(8);
    for (let i = 0; i < 3; i += 1) {
      initialZone.jobs[JobNames.AGRONOMIST].assign();
    }
    for (let i = 0; i < 5; i += 1) {
      initialZone.jobs[JobNames.ARBORIST].assign();
    }
  }

  /**
   * Unlock storage and max out
   */
  @modelAction
  phaseThree() {
    this.phaseTwo();
    const tech = getTech(this);
    const initialZone = getGame(this).initialZone;

    // max caches, maxing storage for all other buildings
    tech[TechNames.STORAGE].cheat();
    initialZone.buildings[BuildingNames.CACHE].cheat(2);

    // resource max
    initialZone.resources[ResourceNames.ALLOY].cheat();
    initialZone.resources[ResourceNames.ORE].cheat();
    initialZone.resources[ResourceNames.ROCK].cheat();
    initialZone.resources[ResourceNames.BIOMASS].cheat();
    initialZone.resources[ResourceNames.LUMBER].cheat();

    // max all other buildings after cache construction
    initialZone.buildings[BuildingNames.HABITAT].cheat(1);
    initialZone.buildings[BuildingNames.FARM].cheat(1);
    initialZone.buildings[BuildingNames.FURNACE].cheat(2);
    initialZone.buildings[BuildingNames.TREE_FARM].cheat(2);

    // max dynamos
    tech[TechNames.ELECTROMAGNETISM].cheat();
    initialZone.buildings[BuildingNames.DYNAMO].cheat(1);
  }

  /**
   * Mining era
   */
  @modelAction
  phaseFour() {
    this.phaseThree();
    const tech = getTech(this);
    const initialZone = getGame(this).initialZone;

    // max mining
    tech[TechNames.SUBSURFACE_EXCAVATION].cheat();
    initialZone.buildings[BuildingNames.MINE].cheat(2);

    // unlock miners and max
    tech[TechNames.GEOLOGY].cheat();
    initialZone.resources[ResourceNames.COLONISTS].cheat();
    initialZone.jobs[JobNames.GEOLOGIST].assign();
  }

  /**
   * Put stuff here to get game in state to repro bugs
   */
  @modelAction
  debug() {
    getRoot(this).reset();
    const initialZone = getGame(this).initialZone;
    const tech = getTech(this);
  }
}
