import {
  model,
  Model,
  modelAction,
  ModelData,
  tProp,
  types,
} from 'mobx-keystone';
import { City } from './city/city';

@model('Root')
export class Root extends Model({
  cities: tProp(types.array(types.model(City)), () => [new City({})]),
}) {
  @modelAction
  addCity() {
    this.cities.push(new City({}));
  }
}
