import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechNames } from './techNames';

@model(TechNames.METALLURGY)
export class Metallurgy extends ExtendedModel(BaseTech, {}) {
  name = TechNames.METALLURGY;
  displayName = 'metallurgy';
  description = 'ship asks: might the ore yield a useful alloy?';
  powerCost = 20;
  unlockWhen = {
    observable: () => {
      return getTech(this)[TechNames.EXCAVATION].researched;
    },
    transient: () => {
      return true;
    },
  };
}
