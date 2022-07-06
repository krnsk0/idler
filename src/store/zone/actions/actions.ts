import { findParent, model, Model, tProp, types } from 'mobx-keystone';
import { enumKeys } from '../../../helpers/enumKeys';
import { ActionNames } from './actionNames';
import { Harvest } from './harvest';
import { Combust } from './combust';
import { Compress } from './compress';
import { Zone } from '../zone';

@model('Actions')
export class Actions extends Model({
  [ActionNames.HARVEST]: tProp(types.model(Harvest), () => new Harvest({})),
  [ActionNames.COMBUST]: tProp(types.model(Combust), () => new Combust({})),
  [ActionNames.COMPRESS]: tProp(types.model(Compress), () => new Compress({})),
}) {
  /**
   * Returns an iterable list of the action model
   */
  get asArray() {
    return enumKeys(ActionNames).map((name) => {
      return this[name];
    });
  }
}

export const getActions = (child: object): Actions => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getActions');
  return zone.actions;
};
