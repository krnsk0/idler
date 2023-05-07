import {
  Model,
  getParent,
  idProp,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { TurretNames } from './turretNames';
import { PurchaseCost } from '../../sharedTypes';
import { getPerimeter } from '../../../selectors';
import { spinner } from '../../../../utils/spinner';

function exhaustiveGuard(value: never): never {
  throw new Error(
    `Reached guard function with unexpected value: ${JSON.stringify(
      value,
    )}. Is switch/case missing a value?`,
  );
}

enum TurretStates {
  EMPTY = 'EMPTY', // no ammo
  RELOADING = 'RELOADING', // loading ammo
  IDLE = 'IDLE', // no targets
  AIMING = 'AIMING', // cooling down between shots
  FIRING = 'FIRING', // attack happens at and
}

const BASE_ATTACK_TIME = 1;

export abstract class BaseTurret extends Model({
  id: idProp,
  state: tProp(types.enum(TurretStates), TurretStates.EMPTY),
  ammo: tProp(types.number, 0),
  reloadTimeRemaining: tProp(types.number, 0),
  attackCooldownRemaining: tProp(types.number, 0),
  fireTimeRemaining: tProp(types.number, 0),
}) {
  // splash
  abstract name: TurretNames;
  abstract displayName: string;
  abstract description: string;

  // ammo
  abstract baseAmmoCost: PurchaseCost[];
  abstract baseAmmoCapacity: number;
  abstract baseAmmoLoadTime: number; // seconds

  // attack
  abstract baseAttackDamage: number;
  abstract baseAttackCooldown: number;

  /**
   * Fgure out which of the 4 turrets this is
   *
   * TODO: test this. will be useful for offsetting turret start times
   */
  @computed
  get turretIndex(): number {
    const index = getPerimeter(this).turrets.findIndex((t) => t.id === this.id);
    if (index < 0) throw new Error('turrent not found');
    return index + 1;
  }

  /**
   * Modified ammo cost
   */
  @computed
  get ammoCost(): PurchaseCost[] {
    return this.baseAmmoCost;
  }

  /**
   * Modified ammo capacity
   */
  @computed
  get ammoCapacity(): number {
    return this.baseAmmoCapacity;
  }
  /**
   * Percent of ammo remaining
   */
  @computed
  get ammoPercent(): number {
    return this.ammo / this.ammoCapacity;
  }

  /**
   * Reload progress as percent
   */
  @computed
  get reloadProgress(): number {
    return 1 - this.reloadTimeRemaining / this.baseAmmoLoadTime;
  }

  /**
   * Are we out of ammo
   */
  @computed
  get isAmmoEmpty() {
    return this.ammo === 0;
  }

  /**
   * Is loading
   */
  @computed
  get isReloading() {
    return this.state === TurretStates.RELOADING;
  }

  /**
   * Is attacking
   */
  @computed
  get isAttacking() {
    return this.state === TurretStates.FIRING;
  }

  /**
   * Modified attack damage
   */
  @computed
  get attackDamage(): number {
    return this.baseAttackDamage;
  }

  /**
   * State descriptor
   */
  @computed
  get stateDescriptor(): string {
    switch (this.state) {
      case TurretStates.EMPTY: {
        return 'empty';
      }
      case TurretStates.RELOADING: {
        return `reloading`;
      }
      case TurretStates.IDLE: {
        return 'idle';
      }
      case TurretStates.AIMING: {
        return `aiming`;
      }
      case TurretStates.FIRING: {
        return 'firing';
      }
      default: {
        exhaustiveGuard(this.state);
      }
    }
  }

  /**
   * State icon
   */
  @computed
  get stateIcon(): string {
    switch (this.state) {
      case TurretStates.EMPTY: {
        return '';
      }
      case TurretStates.RELOADING: {
        return ``;
      }
      case TurretStates.IDLE: {
        return '';
      }
      case TurretStates.AIMING: {
        return spinner(this.attackCooldownRemaining);
      }
      case TurretStates.FIRING: {
        return '^';
      }
      default: {
        exhaustiveGuard(this.state);
      }
    }
  }

  /**
   * Start reload
   */
  @modelAction
  startReload() {
    this.state = TurretStates.RELOADING;
    this.reloadTimeRemaining = this.baseAmmoLoadTime;
  }

  /**
   * Tick
   */
  @modelAction
  tick(delta: number) {
    switch (this.state) {
      case TurretStates.EMPTY: {
        break;
      }
      case TurretStates.RELOADING: {
        this.reloadTimeRemaining = Math.max(
          0,
          this.reloadTimeRemaining - delta,
        );
        if (this.reloadTimeRemaining === 0) {
          this.ammo = this.ammoCapacity;
          this.state = TurretStates.IDLE;
        }
        break;
      }
      case TurretStates.IDLE: {
        if (getPerimeter(this).areTargetsPresent) {
          this.state = TurretStates.AIMING;
          this.attackCooldownRemaining = this.baseAttackCooldown;
        }
        break;
      }
      case TurretStates.AIMING: {
        this.attackCooldownRemaining = Math.max(
          0,
          this.attackCooldownRemaining - delta,
        );
        if (this.attackCooldownRemaining === 0) {
          this.state = TurretStates.FIRING;
          this.fireTimeRemaining = BASE_ATTACK_TIME;
        }
        break;
      }
      case TurretStates.FIRING: {
        this.fireTimeRemaining = Math.max(0, this.fireTimeRemaining - delta);
        if (this.fireTimeRemaining === 0) {
          getPerimeter(this).attackEnemy(this.attackDamage);
          this.ammo -= 1;

          if (this.ammo === 0) {
            this.state = TurretStates.EMPTY;
          } else {
            this.state = TurretStates.AIMING;
            this.attackCooldownRemaining = this.baseAttackCooldown;
          }
        }
        break;
      }
      default: {
        exhaustiveGuard(this.state);
      }
    }
  }
}
