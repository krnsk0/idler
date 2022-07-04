import { findParent, idProp, model, Model, tProp, types } from 'mobx-keystone';
import { Actions } from './actions/actions';
import { Buildings } from './buildings/buildings';
import { Resources } from './resources/resources';
import { makeZoneName } from './zoneName';

@model('Zone')
export class Zone extends Model({
  id: idProp,
  name: tProp(types.string, makeZoneName).withSetter(),
  buildings: tProp(types.model(Buildings), () => new Buildings({})),
  resources: tProp(types.model(Resources), () => new Resources({})),
  actions: tProp(types.model(Actions), () => new Actions({})),
}) {}

export const getZone = (child: object): Zone => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getZone');
  return zone;
};
