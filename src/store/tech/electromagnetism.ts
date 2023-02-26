import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.ELECTROMAGNETISM)
export class Electromagnetism extends ExtendedModel(BaseTech, {}) {
  name = TechNames.ELECTROMAGNETISM;
  displayName = 'electromagnetism';
  description = 'allow the construction of additional generators';
  powerCost = 50;
  transientUnlockCheck = () => true;
  techUnlocked = [TechNames.ZONE_UPGRADES, TechNames.SUBSURFACE_EXCAVATION];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [BuildingNames.DYNAMO];
  upgradesUnlocked = [];
}
