import { model, ExtendedModel } from 'mobx-keystone';
import { UpgradeNames } from '../zone/upgrades/upgradeNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.CONSTRUCTION)
export class Construction extends ExtendedModel(BaseTech, {}) {
  name = TechNames.CONSTRUCTION;
  displayName = 'construction';
  description = 'techniques and tools outpost expansion';
  powerCost = 80;
  transientUnlockCheck = () => true;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [];
  upgradesUnlocked = [UpgradeNames.PREFABRICATION];
}
