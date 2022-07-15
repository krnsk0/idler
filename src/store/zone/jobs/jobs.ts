import { findParent, model, Model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { JobNames } from './jobNames';
import { Arborist } from './arborist';
import { getResources } from '../resources/resources';
import { ResourceNames } from '../resources/resourceNames';
import { Zone } from '../zone';

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

  /**
   * Total colonists. Convenience getter
   */
  @computed
  get totalColonists(): number {
    return getResources(this)[ResourceNames.COLONISTS].quantity;
  }

  /**
   * number of unassinged colonists in all jobs
   */
  @computed
  get unassigned(): number {
    let assigned = 0;
    for (const job of this.asArray) {
      assigned += job.workers;
    }

    return this.totalColonists - assigned;
  }
}

export const getJobs = (child: object): Jobs => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent jobs model found in getJobs');
  return zone.jobs;
};
