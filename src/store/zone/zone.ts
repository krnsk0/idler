import { findParent, idProp, model, Model, tProp, types } from 'mobx-keystone';
import { Buildings } from './buildings/buildings';
import { Resources } from './resources/resources';

const makeZoneName = () => {
  const zoneNames = ['Garden', 'Reprieve', 'University', 'Redoubt', 'Zone'];
  const name = zoneNames[Math.floor(Math.random() * zoneNames.length)];
  const number = Math.floor(Math.random() * 100);
  return `${name} ${number}`;
};

@model('Zone')
export class Zone extends Model({
  id: idProp,
  name: tProp(types.string, makeZoneName).withSetter(),
  buildings: tProp(types.model(Buildings), () => new Buildings({})),
  resources: tProp(types.model(Resources), () => new Resources({})),
}) {}

export const getZone = (child: object): Zone => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getZone');
  return zone;
};
