import { Model, idProp, modelAction, tProp, types } from 'mobx-keystone';
import { EnemyNames } from './enemyNames';
import { computed } from 'mobx';
import { getGui } from '../../selectors';

export abstract class BaseEnemy extends Model({
  id: idProp,
  damageTaken: tProp(types.number, 0),
  cooldownElapsed: tProp(types.number, 0),
}) {
  abstract name: EnemyNames;
  abstract displayName: string;
  abstract description: string;
  abstract baseHitPoints: number;
  abstract cooldownDuration: number;
  abstract damage: number;

  /**
   * How much HP is left?
   */
  @computed
  get remainingHitPoints() {
    return this.baseHitPoints - this.damageTaken;
  }

  /**
   * Is the enemy row expanded?
   */
  get isExpanded(): boolean {
    return getGui(this).expandedEnemyId === this.id;
  }

  /**
   * Get cooldown remaining
   */
  get cooldown() {
    return this.cooldownDuration - this.cooldownElapsed;
  }

  /**
   * Expand this enemy row
   */
  @modelAction
  expandEnemy() {
    getGui(this).setExpandedEnemyId(this.id);
  }
}
