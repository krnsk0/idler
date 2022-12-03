import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechNames } from './techNames';

@model(TechNames.STORAGE)
export class Storage extends ExtendedModel(BaseTech, {}) {
  name = TechNames.STORAGE;
  displayName = 'matter storage';
  description = 'facilities for long-term warehousing';
  unlockWhen = () => {
    return getTech(this)[TechNames.CRYONICS].researched;
  };
  powerCost = 20;
}
