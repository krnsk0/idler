import { model, ExtendedModel } from 'mobx-keystone';
import { getGame } from '../game';
import { JobNames } from '../zone/jobs/jobNames';
import { ResourceNames } from '../zone/resources/resourceNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.AGROFORESTRY)
export class Agroforestry extends ExtendedModel(BaseTech, {}) {
  name = TechNames.AGROFORESTRY;
  displayName = 'agroforestry';
  description = 'sustainable cultivation of arboriform xenoflora';
  powerCost = 20;
  transientUnlockCheck = () =>
    getGame(this).initialZone.resources[ResourceNames.COLONISTS].currentCap > 0;
  techUnlocked = [];
  actionsUnlocked = [];
  jobsUnlocked = [JobNames.ARBORIST];
  buildingsUnlocked = [];
}
