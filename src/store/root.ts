import {
  model,
  Model,
  modelAction,
  ModelData,
  tProp,
  types,
} from 'mobx-keystone';
import { Zone } from './zone/zone';

const initialZoneName = 'Planetfall';

@model('Root')
export class Root extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
}) {
  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }
}
