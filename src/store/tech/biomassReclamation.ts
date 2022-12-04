import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechNames } from './techNames';

@model(TechNames.BIOMASS_RECLAMATION)
export class BiomassReclamation extends ExtendedModel(BaseTech, {}) {
  name = TechNames.BIOMASS_RECLAMATION;
  displayName = 'biomass reclamators';
  description =
    "dismantle the biomass collector and study its design, doubling hydroponic farms' biomass production";
  powerCost = 25;
  transientUnlockCheck = () => true;

  unlockWhen = {
    observable: () => {
      return getTech(this)[TechNames.AGROFORESTRY].researched;
    },
    transient: () => {
      return true;
    },
  };
}
