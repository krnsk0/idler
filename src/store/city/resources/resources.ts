import {
  BaseModel,
  findParent,
  idProp,
  model,
  Model,
  tProp,
  types,
} from 'mobx-keystone';
import { Coal, CoalName } from './coal';

export type ResourceNames = typeof CoalName;

@model('Resources')
export class Resources extends Model({
  [CoalName]: tProp(types.model(Coal), () => new Coal({})),
}) {}
