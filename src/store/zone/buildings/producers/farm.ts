import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../../resources/resourceNames';
import { BaseProducer } from './baseProducer';
import { ProducerNames } from './producerNames';

@model(ProducerNames.Farm)
export class Farm extends ExtendedModel(BaseProducer, {}) {
  displayName = 'Farm';
  baseCost = [
    {
      resource: ResourceNames.Nutrients,
      quantity: 1,
    },
  ];
  costExponent = 1.2;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.Nutrients,
      quantityPerSecond: 0.1,
    },
  ];
}
