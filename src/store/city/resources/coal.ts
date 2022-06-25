import { model, ExtendedModel } from 'mobx-keystone';
import { Resource } from './resource';

export const CoalName = 'Coal';
@model(CoalName)
export class Coal extends ExtendedModel(Resource, {}) {
  displayName = 'Coal';
  displayColor = '#4a4a4a';
}
