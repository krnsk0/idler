import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { Producer } from './producer';

@model('Mine')
export class Mine extends ExtendedModel(Producer, {}) {
  displayName: 'Mine';

  @modelAction
  tick() {
    console.log('ticking');
  }
}
