import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechEffect, TechEffectNames } from './techEffectTypes';
import { TechNames } from './techNames';

const effects: TechEffect[] = [
  {
    kind: TechEffectNames.BUILDING_UNLOCK,
    buildingName: BuildingNames.CACHE,
  },
];

@model(TechNames.STORAGE)
export class Storage extends ExtendedModel(BaseTech, {}) {
  name = TechNames.STORAGE;
  displayName = 'matter storage';
  description = 'facilities for long-term warehousing';
  unlockWhen = () => {
    return getTech(this)[TechNames.CRYONICS].researched;
  };
  powerCost = 20;
  effects = effects;
}
