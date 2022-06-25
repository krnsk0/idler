import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { Coal } from '../resources/coal';
import { Producer } from './producer';

@model('Mine')
export class Mine extends ExtendedModel(Producer, {}) {
  displayName: 'Mine';

  products: [{ resource: typeof Coal; qty: 0.01 }];
}
