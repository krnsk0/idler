import { model, ExtendedModel } from 'mobx-keystone';
import { JobNames } from '../zone/jobs/jobNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.ARBORICULTURE)
export class Arboriculture extends ExtendedModel(BaseTech, {}) {
  name = TechNames.ARBORICULTURE;
  displayName = 'arboriculture';
  description =
    'with training in the biology of arboriform xenoflora, colonists can increase tree farm productivity';
  powerCost = 30;
  transientUnlockCheck = () => true;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [JobNames.ARBORIST];
  buildingsUnlocked = [];
  upgradesUnlocked = [];
}
