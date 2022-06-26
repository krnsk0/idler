import {
  model,
  Model,
  modelAction,
  ModelData,
  tProp,
  types,
} from 'mobx-keystone';
import { Zone } from './zone/zone';

@model('Root')
export class Root extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [new Zone({})]),
}) {
  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }
}
