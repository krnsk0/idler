import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';
import { JobNames } from '../zone/jobs/jobNames';

@model(TechNames.AGRONOMY)
export class Agronomy extends ExtendedModel(BaseTech, {}) {
  name = TechNames.AGRONOMY;
  displayName = 'agronomy';
  description =
    'with some training in xenobiology, colonists can increase food production';
  powerCost = 30;
  transientUnlockCheck = () => true;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [JobNames.AGRONOMIST];
  buildingsUnlocked = [];
}
