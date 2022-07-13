import { model, Model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../helpers/enumKeys';
import { JobNames } from './jobNames';
import { Arborist } from './arborist';

@model('Jobs')
export class Jobs extends Model({
  [JobNames.ARBORIST]: tProp(types.model(Arborist), () => new Arborist({})),
}) {
  /**
   * Returns an iterable list of the producer models
   */
  @computed
  get asArray() {
    return enumKeys(JobNames).map((name) => {
      return this[name];
    });
  }

  /**
   * Iterable list of only unlocked jobs
   */
  @computed
  get unlockedAsArray() {
    return this.asArray.filter((job) => job.unlocked);
  }

  /**
   * Are any resources unlocked?
   */
  @computed
  get anyUnlocked(): boolean {
    return !!this.unlockedAsArray.length;
  }
}
