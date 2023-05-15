import { Model, model, tProp, types } from 'mobx-keystone';
import { Autoballista } from './autoballista';
import { computed } from 'mobx';
import { TurretNames } from './turretNames';
import { enumKeys } from '../../../../utils/enumKeys';

/**
 * These turret models are used for unlock/purchase, not combat.
 */
@model('TurretList')
export class TurretList extends Model({
  [TurretNames.AUTOBALLISTA]: tProp(
    types.model(Autoballista),
    () => new Autoballista({}),
  ),
}) {
  /**
   * Returns an iterable list of the building models
   */
  @computed
  get asArray() {
    return enumKeys(TurretNames).map((name) => {
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
