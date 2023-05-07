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
import { UpgradeNames } from '../zone/upgrades/upgradeNames';

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
    initialZone.resources[ResourceNames.FOOD].cheat();
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
    initialZone.buildings[BuildingNames.HABITAT].cheat(5);
    initialZone.buildings[BuildingNames.FARM].cheat(1);
    initialZone.buildings[BuildingNames.FURNACE].cheat(2);
    initialZone.buildings[BuildingNames.TREE_FARM].cheat(2);

    // max dynamos
    tech[TechNames.ELECTROMAGNETISM].cheat();
    initialZone.buildings[BuildingNames.DYNAMO].cheat(2);
    initialZone.buildings[BuildingNames.DYNAMO].disableEntity();

    // max jobs
    initialZone.resources[ResourceNames.COLONISTS].cheat(13);
    for (let i = 0; i < 3; i += 1) {
      initialZone.jobs[JobNames.AGRONOMIST].assign();
    }
    for (let i = 0; i < 2; i += 1) {
      initialZone.jobs[JobNames.ARBORIST].assign();
    }
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

    // unlock miners
    tech[TechNames.GEOLOGY].cheat();

    // unlock and max upgrades
    tech[TechNames.ZONE_UPGRADES].cheat();
    tech[TechNames.TEMPERATURE_CONTROL].cheat();
    tech[TechNames.CONSTRUCTION].cheat();
    initialZone.upgrades[UpgradeNames.CHAINSAWS].cheat();
    initialZone.upgrades[UpgradeNames.COMPOSTING_DRUMS].cheat();
    initialZone.upgrades[UpgradeNames.TUYERES].cheat();
    initialZone.upgrades[UpgradeNames.CRATES].cheat();
    initialZone.upgrades[UpgradeNames.HEAT_RECLAMATORS].cheat();
    initialZone.upgrades[UpgradeNames.PREFABRICATION].cheat();

    // max buildings
    initialZone.buildings[BuildingNames.CACHE].cheat(2);
    initialZone.buildings[BuildingNames.FARM].cheat(2);
    initialZone.buildings[BuildingNames.TREE_FARM].cheat(1);
    initialZone.buildings[BuildingNames.HABITAT].cheat(7);
    initialZone.buildings[BuildingNames.DYNAMO].enableEntity();

    // resource max
    initialZone.resources[ResourceNames.ALLOY].cheat();
    initialZone.resources[ResourceNames.ORE].cheat();
    initialZone.resources[ResourceNames.ROCK].cheat();
    initialZone.resources[ResourceNames.BIOMASS].cheat();
    initialZone.resources[ResourceNames.LUMBER].cheat();

    // perimeter
    tech[TechNames.RADAR].cheat();
    initialZone.radar.closeWarningModal();
    initialZone.radar.rushNextWave();
  }

  /**
   * Put stuff here to get game in state to repro bugs
   */
  @modelAction
  debug() {
    this.phaseFour();
    const tech = getTech(this);
  }
}
