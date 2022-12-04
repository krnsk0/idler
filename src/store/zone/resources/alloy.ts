import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.ALLOY)
export class Alloy extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.ALLOY;
  displayName = 'allow';
  initialCap = 8;
}
