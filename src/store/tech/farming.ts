import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechNames } from './techNames';

@model(TechNames.FARMING)
export class Farming extends ExtendedModel(BaseTech, {}) {
  name = TechNames.FARMING;
  displayName = 'hydroponic farming';
  description = 'rudimentary applied xenobotany';
  powerCost = 15;
  transientUnlockCheck = () => true;
  unlocksTech = [TechNames.CRYONICS];
  unlocksActions = [];
  unlocksJobs = [];
  unlocksBuildings = [];
}
