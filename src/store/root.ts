import {
  model,
  Model,
  modelAction,
  ModelData,
  tProp,
  types,
} from 'mobx-keystone';
import { City } from './city';

@model('idle/Root')
export class Root extends Model({
  cities: tProp(types.array(types.model(City)), () => []),
}) {
  @modelAction
  addCity() {
    this.cities.push(new City({ name: Math.random().toString() }));
  }
}
