import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.BIOMASS_COMPRESSION)
export class BiomassCompression extends ExtendedModel(BaseTech, {}) {
  name = TechNames.BIOMASS_COMPRESSION;
  displayName = 'biomass compression';
  description =
    'subject to heat and pressure, biomass becomes an arboraceous material suitable for construction';
  powerCost = 10;
  transientUnlockCheck = () => true;

  unlockWhen = {
    observable: () => {
      return true;
    },
    transient: () => {
      return true;
    },
  };
}
