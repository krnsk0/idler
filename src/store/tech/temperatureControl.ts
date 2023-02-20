import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.TEMPERATURE_CONTROL)
export class TemperatureControl extends ExtendedModel(BaseTech, {}) {
  name = TechNames.TEMPERATURE_CONTROL;
  displayName = 'temperature control';
  description = 'techniques and tools for optimizing furnace productivity';
  powerCost = 50;
  transientUnlockCheck = () => true;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [];
  upgradesUnlocked = [];
}
