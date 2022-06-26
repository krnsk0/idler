import { model, Model, tProp, types } from 'mobx-keystone';
import { Nutrients } from './nutrients';
import { ResourceNames } from './resourceNames';

@model('Resources')
export class Resources extends Model({
  [ResourceNames.Nutrients]: tProp(
    types.model(Nutrients),
    () => new Nutrients({ quantity: 10 }),
  ),
}) {}
