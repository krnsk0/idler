import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.FORESTRY)
export class Forestry extends ExtendedModel(BaseTech, {}) {
  name = TechNames.FORESTRY;
  displayName = 'forestry';
  description = 'sustainable cultivation of arboriform xenoflora';
  powerCost = 25;
  transientUnlockCheck = () => true;
  techUnlocked = [TechNames.ARBORICULTURE];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [BuildingNames.TREE_FARM];
}
