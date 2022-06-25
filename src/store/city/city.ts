import {
  BaseModel,
  findParent,
  idProp,
  model,
  Model,
  tProp,
  types,
} from 'mobx-keystone';
import { Mine } from './buildings/mine';
import { Coal } from './resources/coal';

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
  coal: tProp(types.model(Coal), () => new Coal({})),
  mines: tProp(types.model(Mine), () => new Mine({})),
}) {}

export const getCity = (child: object): City => {
  const city = findParent<City>(child, (node) => {
    return node instanceof City;
  });
  return city;
};
