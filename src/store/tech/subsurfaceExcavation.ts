import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.SUBSURFACE_EXCAVATION)
export class SubsurfaceExcavation extends ExtendedModel(BaseTech, {}) {
  name = TechNames.SUBSURFACE_EXCAVATION;
  displayName = 'subsurface mining';
  description = 'delve deeper for useful mineral ores';
  powerCost = 100;
  transientUnlockCheck = () => true;
  techUnlocked = [TechNames.GEOLOGY];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [BuildingNames.MINE];
}
