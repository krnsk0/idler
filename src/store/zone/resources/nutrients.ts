import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.Nutrients)
export class Nutrients extends ExtendedModel(BaseResource, {}) {
  displayName = 'Nutrients';
  displayColor = 'green';
}
