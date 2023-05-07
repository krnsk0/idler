import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { UpgradeNames } from '../zone/upgrades/upgradeNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.METALLURGY)
export class Metallurgy extends ExtendedModel(BaseTech, {}) {
  name = TechNames.METALLURGY;
  displayName = 'metallurgy';
  description = 'might the ore yield a useful alloy?';
  powerCost = 25;
  transientUnlockCheck = () => true;
  techUnlocked = [TechNames.ELECTROMAGNETISM];
  buildingsUnlocked = [BuildingNames.FURNACE];
  upgradesUnlocked = [UpgradeNames.CHAINSAWS];
}
