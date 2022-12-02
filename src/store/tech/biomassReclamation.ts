import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { ResourceNames } from '../zone/resources/resourceNames';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechEffect, TechEffectNames } from './techEffectTypes';
import { TechNames } from './techNames';

const effects: TechEffect[] = [
  {
    kind: TechEffectNames.PRODUCTION_MODIFIER,
    buildingName: BuildingNames.FARM,
    resourceName: ResourceNames.NUTRIENTS,
    multiplier: 2,
  },
];

@model(TechNames.BIOMASS_RECLAMATION)
export class BiomassReclamation extends ExtendedModel(BaseTech, {}) {
  name = TechNames.BIOMASS_RECLAMATION;
  displayName = 'biomass reclamators';
  description =
    'dismantle the biomass collector and study its design, doubling biomass production in hydroponic farms';
  unlockWhen = () => {
    return getTech(this)[TechNames.AGROFORESTRY].researched;
  };
  powerCost = 25;
  effects = effects;
}
