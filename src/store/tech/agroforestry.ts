import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.AGROFORESTRY)
export class Agroforestry extends ExtendedModel(BaseTech, {}) {
  name = TechNames.AGROFORESTRY;
  displayName = 'agroforestry';
  description = 'sustainable cultivation of arboriform xenoflora';
  powerCost = 25;
  transientUnlockCheck = () => true;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [BuildingNames.TREE_FARM];
}
