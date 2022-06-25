import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.Food)
export class Food extends ExtendedModel(BaseResource, {}) {
  displayName = 'Food';
  displayColor = 'green';
}
