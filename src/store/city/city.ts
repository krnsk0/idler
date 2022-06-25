import {
  BaseModel,
  findParent,
  idProp,
  model,
  Model,
  tProp,
  types,
} from 'mobx-keystone';
import { Farm } from './buildings/farm';
import { Resources } from './resources/resources';

const makeCityName = () => {
  const cityNames = ['Garden', 'Reprieve', 'University', 'Redoubt', 'Zone'];
  const name = cityNames[Math.floor(Math.random() * cityNames.length)];
  const number = Math.floor(Math.random() * 100);
  return `${name} ${number}`;
};

@model('City')
export class City extends Model({
  id: idProp,
  name: tProp(types.string, makeCityName).withSetter(),
  farms: tProp(types.model(Farm), () => new Farm({})),
  resources: tProp(types.model(Resources), () => new Resources({})),
}) {}

export const getCity = (child: object): City => {
  const city = findParent<City>(child, (node) => {
    return node instanceof City;
  });
  if (!city) throw new Error('no parent city model found in getCity');
  return city;
};
