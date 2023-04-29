import { Model, idProp, modelAction, tProp, types } from 'mobx-keystone';
import { EnemyNames } from './enemyNames';
import { computed } from 'mobx';
import { getGui } from '../../selectors';

export abstract class BaseEnemy extends Model({
  id: idProp,
  damageTaken: tProp(types.number, 0),
  attackCooldownElapsed: tProp(types.number, 0),

  // modifiers to base stats
  hpModifier: tProp(types.number, 1),
  movementSpeedModifier: tProp(types.number, 1),
  attackDamageModifier: tProp(types.number, 1),
  attackRangeModifier: tProp(types.number, 1),
  attackCooldownModifier: tProp(types.number, 1),
}) {
  // splash
  abstract name: EnemyNames;
  abstract displayName: string;
  abstract description: string;

  // life
  abstract baseHitPoints: number;

  // movement
  abstract baseMovementSpeed: number;

  // attack
  abstract baseAttackCooldown: number;
  abstract baseAttackDamage: number;
  abstract baseAttackRange: number;

  /**
   * Total HP with modifier
   */
  @computed
  get maxHitPoints() {
    return this.baseHitPoints * this.hpModifier;
  }

  /**
   * Total movement speed with modifier
   */
  @computed
  get movementSpeed() {
    return this.baseMovementSpeed * this.movementSpeedModifier;
  }

  /**
   * Total attack cooldown with modifier
   */
  @computed
  get attackCooldown() {
    return this.baseAttackCooldown * this.attackCooldownModifier;
  }

  /**
   * Total attack damage with modifier
   */
  @computed
  get attackDamage() {
    return this.baseAttackDamage * this.attackDamageModifier;
  }

  /**
   * Total attack range with modifier
   */
  @computed
  get attackRange() {
    return this.baseAttackRange * this.attackRangeModifier;
  }

  /**
   * How much HP is left?
   */
  @computed
  get remainingHitPoints() {
    return this.maxHitPoints - this.damageTaken;
  }

  /**
   * What % of health is left?
   */
  @computed
  get remainingHitPointsPercent() {
    return this.remainingHitPoints / this.maxHitPoints;
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
    return this.attackCooldown - this.attackCooldownElapsed;
  }

  /**
   * Expand this enemy row
   */
  @modelAction
  expandEnemy() {
    getGui(this).setExpandedEnemyId(this.id);
  }

  /**
   * The tick for the enemy
   */
  @modelAction
  tick(delta: number) {
    // TODO
  }
}
