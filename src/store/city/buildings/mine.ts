import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { getCity } from '../city';
import { Coal } from '../resources/coal';
import { Resources } from '../resources/resources';
import { Producer } from './producer';

@model('Mine')
export class Mine extends ExtendedModel(Producer, {}) {
  displayName = 'Mine';
  producerFns = [
    (resources: Resources) => {
      resources.coal.increase(0.01);
    },
  ];
}
