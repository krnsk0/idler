import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.LUMBER)
export class Lumber extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.LUMBER;
  displayName = 'lumber';
  initialCap = 20;
  unlockWhen = () => this.quantity > 0;
}
