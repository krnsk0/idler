import { model, Model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { ActionNames } from './actionNames';
import { Harvest } from './harvest';
import { Generate } from './generate';
import { Compress } from './compress';
import { Thaw } from './thaw';
import { Excavate } from './excavate';

@model('Actions')
export class Actions extends Model({
  [ActionNames.HARVEST]: tProp(
    types.model(Harvest),
    () => new Harvest({ _unlockTime: Date.now() }),
  ),
  [ActionNames.GENERATE]: tProp(types.model(Generate), () => new Generate({})),
  [ActionNames.COMPRESS]: tProp(types.model(Compress), () => new Compress({})),
  [ActionNames.THAW]: tProp(types.model(Thaw), () => new Thaw({})),
  [ActionNames.EXCAVATE]: tProp(types.model(Excavate), () => new Excavate({})),
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
  get unlockedAsArray() {
    return this.asArray.filter((action) => action.unlocked);
  }
}
