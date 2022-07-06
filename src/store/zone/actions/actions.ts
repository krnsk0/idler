import { findParent, model, Model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../helpers/enumKeys';
import { ActionNames } from './actionNames';
import { Harvest } from './harvest';
import { Generate } from './generate';
import { Compress } from './compress';
import { Compute } from './compute';
import { Zone } from '../zone';

@model('Actions')
export class Actions extends Model({
  [ActionNames.HARVEST]: tProp(
    types.model(Harvest),
    () => new Harvest({ unlocked: true }),
  ),
  [ActionNames.GENERATE]: tProp(types.model(Generate), () => new Generate({})),
  [ActionNames.COMPRESS]: tProp(types.model(Compress), () => new Compress({})),
  [ActionNames.COMPUTE]: tProp(types.model(Compute), () => new Compute({})),
}) {
  /**
   * Returns an iterable list of the action model
   */
  @computed
  get asArray() {
    return enumKeys(ActionNames).map((name) => {
      return this[name];
    });
  }

  /**
   * Iterable list of only unlocked actions
   */
  @computed
  get unlocked() {
    return this.asArray.filter((action) => action.unlocked);
  }
}

export const getActions = (child: object): Actions => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getActions');
  return zone.actions;
};
