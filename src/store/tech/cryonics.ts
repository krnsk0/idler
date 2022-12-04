import { model, ExtendedModel } from 'mobx-keystone';
import { getGame } from '../game';
import { ActionNames } from '../zone/actions/actionNames';
import { ResourceNames } from '../zone/resources/resourceNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.CRYONICS)
export class Cryonics extends ExtendedModel(BaseTech, {}) {
  name = TechNames.CRYONICS;
  displayName = 'repair cryosuite';
  description =
    'in the wreckage, thousands sleep in suspended animation. ship says it can wake them';
  powerCost = 20;
  transientUnlockCheck = () =>
    getGame(this).initialZone.resources[ResourceNames.COLONISTS].currentCap > 0;
  unlocksTech = [TechNames.AGROFORESTRY, TechNames.STORAGE];
  unlocksActions = [ActionNames.THAW];
  unlocksJobs = [];
  unlocksBuildings = [];
}
