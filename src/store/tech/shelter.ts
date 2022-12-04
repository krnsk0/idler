import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.SHELTER)
export class Shelter extends ExtendedModel(BaseTech, {}) {
  name = TechNames.SHELTER;
  displayName = 'shelter';
  description = 'primitive protection from the elements';
  powerCost = 15;
  transientUnlockCheck = () => true;
  unlocksTech = [TechNames.CRYONICS];
  unlocksActions = [];
  unlocksJobs = [];
  unlocksBuildings = [];
}
