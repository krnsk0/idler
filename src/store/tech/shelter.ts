import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechNames } from './techNames';

@model(TechNames.SHELTER)
export class Shelter extends ExtendedModel(BaseTech, {}) {
  name = TechNames.SHELTER;
  displayName = 'shelter';
  description = 'primitive protection from the elements';
  unlockWhen = () => {
    return getTech(this)[TechNames.BIOMASS_COMPRESSION].researched;
  };
  powerCost = 15;
}
