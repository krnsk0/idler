import { model, ExtendedModel } from 'mobx-keystone';

import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.NEURAL_REPROGRAMMING)
export class NeuralReprogramming extends ExtendedModel(BaseTech, {}) {
  name = TechNames.NEURAL_REPROGRAMMING;
  displayName = 'neural reprogramming';
  description = 'teach colonists new skills via direct interface with ship';
  powerCost = 50;
  transientUnlockCheck = () => true;
  techUnlocked = [
    TechNames.AGRONOMY,
    TechNames.ARBORICULTURE,
    TechNames.GEOLOGY,
  ];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [];
  upgradesUnlocked = [];
}
