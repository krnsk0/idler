import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.LUMBER)
export class Lumber extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.LUMBER;
  displayName = 'lumber';
  initialCap = 10;
  unlockWhen = {
    observable: () => {
      return true;
    },
    transient: () => {
      return this.quantity > 0;
    },
  };
}
