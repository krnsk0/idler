import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { CoalName } from '../resources/coal';
import { Producer } from './producer';

@model('Mine')
export class Mine extends ExtendedModel(Producer, {}) {
  displayName = 'Mine';
  products = [
    {
      resource: CoalName,
      qty: 0.01,
    },
  ];
}
