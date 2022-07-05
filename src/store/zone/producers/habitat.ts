import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseProducer } from './baseProducer';
import { ProducerNames } from './producerNames';

@model(ProducerNames.HABITAT)
export class Habitat extends ExtendedModel(BaseProducer, {}) {
  name = ProducerNames.HABITAT;
  displayName = 'habitat';
  description = 'Provides housing for __ colonists';
  splashText = 'Protection from the elements';
  baseCost = [
    {
      resource: ResourceNames.NUTRIENTS,
      quantity: 5,
    },
  ];
  costExponent = 1.2;
  inputs = [];
  outputs = [];
  storage = {};
}
