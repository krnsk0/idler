import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseProducer } from './baseProducer';
import { ProducerNames } from './producerNames';

@model(ProducerNames.HABITAT)
export class Habitat extends ExtendedModel(BaseProducer, {}) {
  name = ProducerNames.HABITAT;
  displayName = 'habitat';
  description = 'housing for 2 colonists';
  splashText = 'protection from the elements';
  baseCost = [
    {
      resource: ResourceNames.LUMBER,
      quantity: 5,
    },
  ];
  costExponent = 1.25;
  inputs = [];
  outputs = [];
  storage = [
    {
      resource: ResourceNames.COLONISTS,
      quantity: 2,
    },
  ];
  unlockWhen = () => this.isUnlockedByTech;
}
