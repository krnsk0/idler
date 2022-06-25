import { model, Model, tProp, types } from 'mobx-keystone';
import { Food } from './food';
import { ResourceNames } from './resourceNames';

@model('Resources')
export class Resources extends Model({
  [ResourceNames.Food]: tProp(types.model(Food), () => new Food({})),
}) {}
