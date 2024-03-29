import { model, ExtendedModel } from 'mobx-keystone';
import { ActionNames } from '../zone/actions/actionNames';
import { JobNames } from '../zone/jobs/jobNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.CRYONICS)
export class Cryonics extends ExtendedModel(BaseTech, {}) {
  name = TechNames.CRYONICS;
  displayName = 'repair cryosuite';
  description =
    'in the wreckage, thousands sleep in suspended animation. ship says it can wake them';
  powerCost = 20;
  transientUnlockCheck = () => true;
  techUnlocked = [
    TechNames.AGRONOMY,
    TechNames.ARBORICULTURE,
    TechNames.GEOLOGY,
  ];
  actionsUnlocked = [ActionNames.THAW];
  actionsRelocked = [];
  jobsUnlocked = [JobNames.GLEANER];
  buildingsUnlocked = [];
  upgradesUnlocked = [];
}
