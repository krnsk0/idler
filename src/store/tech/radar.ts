import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.RADAR)
export class Radar extends ExtendedModel(BaseTech, {}) {
  name = TechNames.RADAR;
  displayName = 'radiolocation';
  description = 'ship offers a means scan terrain adjacent to the colony';
  powerCost = 150;
  transientUnlockCheck = () => true;
}
