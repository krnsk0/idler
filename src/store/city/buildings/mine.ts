import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { Producer } from './producer';

@model('Mine')
export class Mine extends ExtendedModel(Producer, {}) {
  displayName = 'Mine';
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.Coal,
      qty: 0.01,
    },
  ];
}
