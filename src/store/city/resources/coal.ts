import { model, ExtendedModel } from 'mobx-keystone';
import { Resource } from './resource';

@model('Coal')
export class Coal extends ExtendedModel(Resource, {}) {
  displayName = 'Coal';
  displayColor = '#4a4a4a';
}
