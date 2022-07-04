import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.NUTRIENTS)
export class Nutrients extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.NUTRIENTS;
  displayName = 'nutrients';
  displayColor = 'green';
  initialCap = 100;
}
