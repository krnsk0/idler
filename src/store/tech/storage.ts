import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechNames } from './techNames';

@model(TechNames.STORAGE)
export class Storage extends ExtendedModel(BaseTech, {}) {
  name = TechNames.STORAGE;
  displayName = 'matter storage';
  description = 'facilities for long-term warehousing';
  powerCost = 20;
  unlockWhen = {
    observable: () => {
      return getTech(this)[TechNames.CRYONICS].researched;
    },
    transient: () => {
      return true;
    },
  };
}
