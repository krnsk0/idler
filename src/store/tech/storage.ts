import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.STORAGE)
export class Storage extends ExtendedModel(BaseTech, {}) {
  name = TechNames.STORAGE;
  displayName = 'matter storage';
  description = 'facilities for long-term warehousing';
  powerCost = 30;
  transientUnlockCheck = () => true;
  techUnlocked = [TechNames.CONSTRUCTION];
  buildingsUnlocked = [BuildingNames.CACHE];
}
