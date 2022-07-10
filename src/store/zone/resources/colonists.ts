import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.COLONISTS)
export class Colonists extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.COLONISTS;
  displayName = 'colonist';
  initialCap = 0;
  unlockWhen = () => this.currentCap > 0;
}
