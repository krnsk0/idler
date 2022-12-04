import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechNames } from './techNames';

@model(TechNames.SHELTER)
export class Shelter extends ExtendedModel(BaseTech, {}) {
  name = TechNames.SHELTER;
  displayName = 'shelter';
  description = 'primitive protection from the elements';
  powerCost = 15;
  transientUnlockCheck = () => true;
  unlockWhen = {
    observable: () => {
      return getTech(this)[TechNames.BIOMASS_COMPRESSION].researched;
    },
    transient: () => {
      return true;
    },
  };
}
