import { model, ExtendedModel } from 'mobx-keystone';
import { ActionNames } from '../zone/actions/actionNames';
import { ProducerNames } from '../zone/producers/producerNames';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechEffect, TechEffectNames } from './techEffectTypes';
import { TechNames } from './techNames';

const effects: TechEffect[] = [
  {
    kind: TechEffectNames.PRODUCER_UNLOCK,
    producerName: ProducerNames.FARM,
  },
];

@model(TechNames.FARMING)
export class Farming extends ExtendedModel(BaseTech, {}) {
  name = TechNames.FARMING;
  displayName = 'farming';
  description = 'rudimentary applied xenobotany';
  unlockWhen = () => {
    return getTech(this)[TechNames.BIOMASS_COMPRESSION].researched;
  };
  powerCost = 15;
  effects = effects;
}
