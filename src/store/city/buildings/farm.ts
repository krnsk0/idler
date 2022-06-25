import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseProducer } from './baseProducer';

@model('Farm')
export class Farm extends ExtendedModel(BaseProducer, {}) {
  displayName = 'Farm';
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.Food,
      quantity: 0.01,
    },
  ];
}
