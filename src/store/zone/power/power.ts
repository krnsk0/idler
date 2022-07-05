import { findParent, idProp, model, Model, tProp, types } from 'mobx-keystone';
import { Zone } from '../zone';
import { computed } from 'mobx';

@model('Power')
export class Power extends Model({}) {
  @computed
  get supply(): number {
    return 0;
  }

  @computed
  get demand(): number {
    return 0;
  }
}

export const getPower = (child: object): Power => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getZone');
  return zone.power;
};
