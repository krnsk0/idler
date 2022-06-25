import { idProp, model, Model, tProp, types } from 'mobx-keystone';
import { Mine } from './buildings/mine';

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
  mine: tProp(types.model(Mine), new Mine({})),
}) {}
