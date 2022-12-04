import { model, ExtendedModel } from 'mobx-keystone';
import { JobNames } from '../zone/jobs/jobNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.AGROFORESTRY)
export class Agroforestry extends ExtendedModel(BaseTech, {}) {
  name = TechNames.AGROFORESTRY;
  displayName = 'agroforestry';
  description = 'sustainable cultivation of arboriform xenoflora';
  powerCost = 20;
  transientUnlockCheck = () => true;
  unlocksTech = [];
  unlocksActions = [];
  unlocksJobs = [JobNames.ARBORIST];
  unlocksBuildings = [];
}
