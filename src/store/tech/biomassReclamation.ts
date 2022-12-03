import { model, ExtendedModel } from 'mobx-keystone';
import { ActionNames } from '../zone/actions/actionNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { ResourceNames } from '../zone/resources/resourceNames';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechEffect, TechEffectNames } from './techEffectTypes';
import { TechNames } from './techNames';

const effects: TechEffect[] = [
  {
    kind: TechEffectNames.BUILDING_PRODUCTION_MODIFIER,
    buildingName: BuildingNames.FARM,
    resourceName: ResourceNames.BIOMASS,
    multiplier: 2,
  },
  {
    kind: TechEffectNames.ACTION_RELOCK,
    actionName: ActionNames.HARVEST,
  },
];

@model(TechNames.BIOMASS_RECLAMATION)
export class BiomassReclamation extends ExtendedModel(BaseTech, {}) {
  name = TechNames.BIOMASS_RECLAMATION;
  displayName = 'biomass reclamators';
  description =
    "dismantle the biomass collector and study its design, doubling hydroponic farms' biomass production";
  unlockWhen = () => {
    return getTech(this)[TechNames.AGROFORESTRY].researched;
  };
  powerCost = 25;
  effects = effects;
}
