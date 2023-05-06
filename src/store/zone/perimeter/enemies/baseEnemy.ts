import { Model, idProp, modelAction, tProp, types } from 'mobx-keystone';
import { EnemyNames } from './enemyNames';
import { computed } from 'mobx';
import { getGui, getPerimeter } from '../../../selectors';
import { formatTime } from '../../../../utils/formatTime';
import { formatNumber } from '../../../../utils/formatNumber';
import { spinner } from '../../../../utils/spinner';

function exhaustiveGuard(value: never): never {
  throw new Error(
    `Reached guard function with unexpected value: ${JSON.stringify(
      value,
    )}. Is switch/case missing a value?`,
  );
}

// meters
const PERIMETER_SIZE = 100;

// seconds
const BASE_ATTACK_TIME = 1;

enum EnemyState {
  IDLE = 'IDLE',
  DEAD = 'DEAD',
  MOVING = 'MOVING',
  ATTACKING = 'ATTACKING',
}

export abstract class BaseEnemy extends Model({
  id: idProp,
  damageTaken: tProp(types.number, 0),
  attackCooldownRemaining: tProp(types.number, 0), // seconds
  attackTimeRemaining: tProp(types.number, 0), // seconds
  distanceTraveled: tProp(types.number, 0), // meters

  // modifiers to base stats
  hpModifier: tProp(types.number, 1),
  movementSpeedModifier: tProp(types.number, 1),
  attackDamageModifier: tProp(types.number, 1),
  attackRangeModifier: tProp(types.number, 1),
  attackCooldownModifier: tProp(types.number, 1),

  // state
  state: tProp(types.enum(EnemyState), EnemyState.MOVING),
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
   *
   * Meters per second
   */
  @computed
  get movementSpeed() {
    return this.baseMovementSpeed * this.movementSpeedModifier;
  }

  /**
   * Total attack cooldown with modifier
   */
  @computed
  get totalAttackCooldown() {
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
    return Math.max(this.maxHitPoints - this.damageTaken, 0);
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
  @computed
  get isExpanded(): boolean {
    return getGui(this).expandedEnemyId === this.id;
  }

  /**
   * Disance from perimeter
   */
  @computed
  get distanceFromPerimeter() {
    return Math.max(PERIMETER_SIZE - this.distanceTraveled, 0);
  }

  /**
   * Within attack range?
   */
  @computed
  get isWithinAttackRange() {
    return this.distanceFromPerimeter <= this.attackRange;
  }

  /**
   * Ready to attack?
   */
  @computed
  get canAttack() {
    return this.attackCooldownRemaining <= 0;
  }

  /**
   * Can move forward?
   */
  @computed
  get canMoveForward() {
    return this.distanceTraveled < PERIMETER_SIZE;
  }

  /**
   * Check if enemy is dead
   */
  @computed
  get isDead() {
    return this.remainingHitPoints <= 0;
  }

  /**
   * Visual state descriptor
   */
  @computed
  get stateDescriptor(): string {
    switch (this.state) {
      case EnemyState.IDLE: {
        return formatTime(this.attackCooldownRemaining);
      }
      case EnemyState.MOVING: {
        return formatNumber(this.distanceFromPerimeter) + 'm';
      }
      case EnemyState.ATTACKING: {
        return spinner(this.attackTimeRemaining);
      }
      case EnemyState.DEAD: {
        return 'dead';
      }
      default: {
        exhaustiveGuard(this.state);
      }
    }
  }

  /**
   * Expand this enemy row
   */
  @modelAction
  expandEnemy() {
    getGui(this).setExpandedEnemyId(this.id);
  }

  /**
   * Kick off attack phase
   */
  @modelAction
  startAttackPhase() {
    this.attackTimeRemaining = BASE_ATTACK_TIME;
    this.state = EnemyState.ATTACKING;
  }

  /**
   * Actually carry out attack
   */
  @modelAction
  doAttack() {
    getPerimeter(this).damagePerimeter(this.attackDamage);
  }

  /**
   * take damage
   */
  @modelAction
  takeDamage(damage: number) {
    this.damageTaken += damage;
    if (this.damageTaken > this.maxHitPoints) {
      this.state = EnemyState.DEAD;
    }
  }

  /**
   * The tick for the enemy
   */
  @modelAction
  tick(delta: number) {
    this.attackCooldownRemaining = Math.max(
      0,
      this.attackCooldownRemaining - delta,
    );
    if (this.isDead) {
      this.state = EnemyState.DEAD;
    }

    switch (this.state) {
      case EnemyState.MOVING: {
        if (this.isWithinAttackRange && this.canAttack) {
          this.startAttackPhase();
        } else if (this.canMoveForward) {
          this.distanceTraveled += this.movementSpeed * delta;
        } else {
          this.state = EnemyState.IDLE;
        }
        break;
      }
      case EnemyState.ATTACKING: {
        if (this.attackTimeRemaining > 0) {
          this.attackTimeRemaining -= delta;
        } else {
          this.doAttack();
          this.attackCooldownRemaining = this.totalAttackCooldown;
          if (this.canMoveForward) this.state = EnemyState.MOVING;
          else this.state = EnemyState.IDLE;
        }

        break;
      }
      case EnemyState.DEAD: {
        break;
      }
      case EnemyState.IDLE: {
        if (this.canMoveForward) this.state = EnemyState.MOVING;
        else if (this.isWithinAttackRange && this.canAttack) {
          this.startAttackPhase();
        }
        break;
      }
      default: {
        exhaustiveGuard(this.state);
      }
    }
  }
}
