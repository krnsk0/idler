import { model, ExtendedModel } from 'mobx-keystone';
import { ActionNames } from '../zone/actions/actionNames';

import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.EXCAVATION)
export class Excavation extends ExtendedModel(BaseTech, {}) {
  name = TechNames.EXCAVATION;
  displayName = 'repair excavator';
  description = "ship detects mineral deposits beneath the planet's surface";
  powerCost = 15;
  transientUnlockCheck = () => true;
  techUnlocked = [TechNames.METALLURGY];
  actionsUnlocked = [ActionNames.EXCAVATE];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [];
}
