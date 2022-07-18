import { model, ExtendedModel } from 'mobx-keystone';
import { ProducerNames } from '../zone/producers/producerNames';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechEffect, TechEffectNames } from './techEffectTypes';
import { TechNames } from './techNames';

const effects: TechEffect[] = [
  {
    kind: TechEffectNames.PRODUCER_UNLOCK,
    producerName: ProducerNames.HABITAT,
  },
];

@model(TechNames.SHELTER)
export class Shelter extends ExtendedModel(BaseTech, {}) {
  name = TechNames.SHELTER;
  displayName = 'shelter';
  description = 'primitive protection from the elements';
  unlockWhen = () => {
    return getTech(this)[TechNames.BIOMASS_COMPRESSION].researched;
  };
  powerCost = 15;
  effects = effects;
}
