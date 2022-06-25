import { idProp, model, Model, tProp, types, ModelData } from 'mobx-keystone';

@model('idle/City')
export class City extends Model({
  id: idProp,
  name: tProp(types.string).withSetter(),
}) {}

export type CityModel = ModelData<City>;
