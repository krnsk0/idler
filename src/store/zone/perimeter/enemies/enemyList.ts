import { Model, model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';

import { EnemyNames } from './enemyNames';
import { PhaseWorm } from './phaseWorm';
import { PhaseMantis } from './phaseMantis';
import { enumKeys } from '../../../../utils/enumKeys';

/**
 * Instances of enemies actually used for combat are stored in zone data,
 * and there are often multiples of them
 *
 * This model exists to store single global isntances of enemies to run
 * their unlock logic. May be useful in future for an in-game encyclopedia
 */
@model('EnemyList')
export class EnemyList extends Model({
  [EnemyNames.PHASE_WORM]: tProp(
    types.model(PhaseWorm),
    () => new PhaseWorm({}),
  ),
  [EnemyNames.PHASE_MANTIS]: tProp(
    types.model(PhaseMantis),
    () => new PhaseMantis({}),
  ),
}) {
  /**
   * Returns an iterable list of the models
   */
  @computed
  get asArray() {
    return enumKeys(EnemyNames).map((name) => {
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
