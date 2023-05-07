import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { UpgradeNames } from '../zone/upgrades/upgradeNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.SHELTER)
export class Shelter extends ExtendedModel(BaseTech, {}) {
  name = TechNames.SHELTER;
  displayName = 'shelter';
  description = 'primitive protection from the elements';
  powerCost = 15;
  transientUnlockCheck = () => true;
  techUnlocked = [TechNames.CRYONICS, TechNames.STORAGE];
  buildingsUnlocked = [BuildingNames.HABITAT];
  upgradesUnlocked = [UpgradeNames.PREFABRICATION];
}
