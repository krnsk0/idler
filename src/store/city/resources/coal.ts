import { model, ExtendedModel } from 'mobx-keystone';
import { Resource } from './resource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.Coal)
export class Coal extends ExtendedModel(Resource, {}) {
  displayName = 'Coal';
  displayColor = '#4a4a4a';
}
