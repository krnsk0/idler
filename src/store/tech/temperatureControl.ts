import { model, ExtendedModel } from 'mobx-keystone';
import { UpgradeNames } from '../zone/upgrades/upgradeNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.TEMPERATURE_CONTROL)
export class TemperatureControl extends ExtendedModel(BaseTech, {}) {
  name = TechNames.TEMPERATURE_CONTROL;
  displayName = 'temperature control';
  description = 'techniques and tools for controlling endothermic reactions';
  powerCost = 50;
  transientUnlockCheck = () => true;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [];
  upgradesUnlocked = [UpgradeNames.TUYERES, UpgradeNames.HEAT_RECLAMATORS];
}
