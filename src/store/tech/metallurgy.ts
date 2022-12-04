import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.METALLURGY)
export class Metallurgy extends ExtendedModel(BaseTech, {}) {
  name = TechNames.METALLURGY;
  displayName = 'metallurgy';
  description = 'ship asks: might the ore yield a useful alloy?';
  powerCost = 20;
  transientUnlockCheck = () => true;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [];
}
