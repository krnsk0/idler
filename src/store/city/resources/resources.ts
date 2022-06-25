import {
  BaseModel,
  findParent,
  idProp,
  model,
  Model,
  tProp,
  types,
} from 'mobx-keystone';
import { Coal } from './coal';

@model('Resources')
export class Resources extends Model({
  coal: tProp(types.model(Coal), () => new Coal({})),
}) {}
