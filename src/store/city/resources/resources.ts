import { model, Model, tProp, types } from 'mobx-keystone';
import { Coal } from './coal';
import { ResourceNames } from './resourceNames';

@model('Resources')
export class Resources extends Model({
  [ResourceNames.Coal]: tProp(types.model(Coal), () => new Coal({})),
}) {}
