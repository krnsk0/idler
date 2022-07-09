import { model, ExtendedModel } from 'mobx-keystone';
import { ActionNames } from '../zone/actions/actionNames';
import { BaseTech } from './baseTech';
import { TechEffect, TechEffectNames } from './techEffectTypes';
import { TechNames } from './techNames';

const effects: TechEffect[] = [
  {
    kind: TechEffectNames.ACTION_UNLOCK,
    actionName: ActionNames.COMPRESS,
  },
];

@model(TechNames.BIOMASS_COMPRESSION)
export class BiomassCompression extends ExtendedModel(BaseTech, {}) {
  name = TechNames.BIOMASS_COMPRESSION;
  displayName = 'biomass compression';
  description =
    'subject to heat and pressure, biomass becomes an arboraceous material suitable for construction';
  unlockWhen = () => true;
  powerCost = 20;
  effects = effects;
}
