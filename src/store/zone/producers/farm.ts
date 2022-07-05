import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseProducer } from './baseProducer';
import { ProducerNames } from './producerNames';

@model(ProducerNames.FARM)
export class Farm extends ExtendedModel(BaseProducer, {}) {
  name = ProducerNames.FARM;
  displayName = 'farm';
  description =
    'build facility which cultivates edible flora, producing biomass byproduct';
  splashText = 'a triumph of xenobotany';
  baseCost = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 3,
    },
    {
      resource: ResourceNames.LUMBER,
      quantity: 2,
    },
  ];
  costExponent = 1.2;
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
  storage = { [ResourceNames.NUTRIENTS]: 10 };
}
