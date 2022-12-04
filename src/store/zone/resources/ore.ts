import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.ORE)
export class Ore extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.ORE;
  displayName = 'ore';
  initialCap = 8;
}
