import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { getResources } from '../resources/resources';
import { BaseProducer } from './baseProducer';
import { ProducerNames } from './producerNames';

@model(ProducerNames.FARM)
export class Farm extends ExtendedModel(BaseProducer, {}) {
  name = ProducerNames.FARM;
  displayName = 'farm';
  description = 'cultivates edible xenoflora, producing biomass as byproduct';
  splashText = 'a triumph of xenobotany';
  baseCost = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 4,
    },
    {
      resource: ResourceNames.LUMBER,
      quantity: 2,
    },
  ];
  costExponent = 1.45;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.NUTRIENTS,
      quantityPerSecond: 0.05,
    },
    {
      resource: ResourceNames.BIOMASS,
      quantityPerSecond: 0.1,
    },
  ];
  storage = [];
  unlockWhen = () => this.isUnlockedByTech;
}
