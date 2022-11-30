import {
  findParent,
  getRoot,
  model,
  Model,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { getGame } from '../game';
import { Root } from '../root';
import { getTech } from '../tech/tech';
import { TechNames } from '../tech/techNames';
import { ActionNames } from '../zone/actions/actionNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { ResourceNames } from '../zone/resources/resourceNames';

@model('Debug')
export class Debug extends Model({
  hyperMode: tProp(types.boolean, false),
}) {
  @modelAction
  toggleHyperMode() {
    this.hyperMode = !this.hyperMode;
    console.log('hyper', this.hyperMode);
  }

  /**
   * Get to the point of buildings being unlocked
   */
  @modelAction
  phaseOne() {
    getRoot(this).reset();
    const initialZone = getGame(this).initialZone;
    const tech = getTech(this);
    initialZone.actions[ActionNames.GENERATE].unlocked = true;
    initialZone.resources[ResourceNames.BIOMASS].cheat();
    tech[TechNames.BIOMASS_COMPRESSION].cheat();
    initialZone.resources[ResourceNames.LUMBER].cheat();
    tech[TechNames.AGROFORESTRY].cheat();
    tech[TechNames.FARMING].cheat();
    tech[TechNames.SHELTER].cheat();
  }

  /**
   * Max buildings, unlock jobs
   */
  @modelAction
  phaseTwo() {
    this.phaseOne();
    const tech = getTech(this);
    const initialZone = getGame(this).initialZone;
    initialZone.buildings[BuildingNames.FARM].cheat(5);
    initialZone.buildings[BuildingNames.HABITAT].cheat(2);
    initialZone.resources[ResourceNames.NUTRIENTS].cheat();
    tech[TechNames.CRYONICS].cheat();
    tech[TechNames.STORAGE].cheat();
    initialZone.resources[ResourceNames.COLONISTS].cheat(2);
  }
}
export const getDebug = (child: object): Debug => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no parent root model found in getDebug');
  return root.debug;
};
