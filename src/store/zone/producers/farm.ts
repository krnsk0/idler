import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseProducer } from './baseProducer';
import { ProducerNames } from './producerNames';

@model(ProducerNames.FARM)
export class Farm extends ExtendedModel(BaseProducer, {}) {
  name = ProducerNames.FARM;
  displayName = 'farm';
  description =
    'grows food grows food grows food grows food grows food grows food grows food';
  baseCost = [
    {
      resource: ResourceNames.NUTRIENTS,
      quantity: 1,
    },
  ];
  costExponent = 1.2;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.NUTRIENTS,
      quantityPerSecond: 0.1,
    },
  ];
  storage = { [ResourceNames.NUTRIENTS]: 10 };
}
