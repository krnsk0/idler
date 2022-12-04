import { model, ExtendedModel } from 'mobx-keystone';

import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechNames } from './techNames';

@model(TechNames.EXCAVATION)
export class Excavation extends ExtendedModel(BaseTech, {}) {
  name = TechNames.EXCAVATION;
  displayName = 'terrain excavation';
  description = "ship detects mineral deposits beneath planet's surface";
  powerCost = 20;
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
