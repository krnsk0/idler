import { model, Model, tProp, types } from 'mobx-keystone';
import { enumKeys } from '../../../helpers/enumKeys';
import { ActionNames } from './actionNames';
import { Harvest } from '../actions/harvest';
import { Compress } from './compress';

@model('Actions')
export class Actions extends Model({
  [ActionNames.HARVEST]: tProp(types.model(Harvest), () => new Harvest({})),
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
