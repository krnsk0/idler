import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.FARMING)
export class Farming extends ExtendedModel(BaseTech, {}) {
  name = TechNames.FARMING;
  displayName = 'cultivation';
  description = 'rudimentary applied xenobotany';
  powerCost = 12;
  transientUnlockCheck = () => true;
  techUnlocked = [TechNames.FORESTRY];
  buildingsUnlocked = [BuildingNames.FARM];
}
