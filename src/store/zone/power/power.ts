import { findParent, model, Model } from 'mobx-keystone';
import { Zone } from '../zone';
import { computed } from 'mobx';
import { getActions } from '../actions/actions';

@model('Power')
export class Power extends Model({}) {
  @computed
  get production(): number {
    return getActions(this).asArray.reduce((total, action) => {
      return total + action.powerProduction;
    }, 0);
  }

  @computed
  get consumption(): number {
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
