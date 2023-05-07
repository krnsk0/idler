import { model, ExtendedModel } from 'mobx-keystone';
import { JobNames } from '../zone/jobs/jobNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.GEOLOGY)
export class Geology extends ExtendedModel(BaseTech, {}) {
  name = TechNames.GEOLOGY;
  displayName = 'geology';
  description =
    'with some training in mining geology, colonists can increase mine productivity';
  powerCost = 30;
  transientUnlockCheck = () => true;
  jobsUnlocked = [JobNames.GEOLOGIST];
}
