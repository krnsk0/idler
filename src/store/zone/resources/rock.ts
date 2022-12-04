import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.ROCK)
export class Rock extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.ROCK;
  displayName = 'rock';
  initialCap = 15;
}
