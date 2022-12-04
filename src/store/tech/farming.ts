import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.FARMING)
export class Farming extends ExtendedModel(BaseTech, {}) {
  name = TechNames.FARMING;
  displayName = 'hydroponic farming';
  description = 'rudimentary applied xenobotany';
  powerCost = 15;
  transientUnlockCheck = () => true;
  techUnlocked = [TechNames.CRYONICS];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [BuildingNames.FARM];
}
