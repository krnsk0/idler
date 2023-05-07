import {
  ExtendedModel,
  Model,
  idProp,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { TurretNames } from './turretNames';
import { PurchaseCost } from '../zone/sharedTypes';
import { getPerimeter, getTech } from '../selectors';
import { spinner } from '../../utils/spinner';
import { Unlockable } from '../unlockable';

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
  WARMUP = 'WARMUP', // offset that makes it so multiple turrets don't line up
  AIMING = 'AIMING', // cooling down between shots
  FIRING = 'FIRING', // attack happens at and
}

const BASE_ATTACK_TIME = 1;

const START_OFFSET_PER_TURRET = 0.2;
export abstract class BaseTurret extends ExtendedModel(Unlockable, {
  id: idProp,
  state: tProp(types.enum(TurretStates), TurretStates.EMPTY),
  ammo: tProp(types.number, 0),
  reloadTimeRemaining: tProp(types.number, 0),
  aimTimeRemaining: tProp(types.number, 0),
  fireTimeRemaining: tProp(types.number, 0),
  warmupTimeRemaining: tProp(types.number, 0),
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

  // purchase
  abstract purchaseCost: PurchaseCost[];

  // can be overriden
  transientUnlockCheck = () => true;

  /**
   * Responsible for managing when buildings are unlocked
   */
  observableUnlockCheck = () => {
    return getTech(this).unlockedTurrets.includes(this.name);
  };

  /**
   * Fgure out which of the 4 turrets this is
   *
   * TODO: test this. will be useful for offsetting turret start times
   */
  @computed
  get turretIndex(): number {
    const index = this.perimeter.turrets.findIndex((t) => t.id === this.id);
    if (index < 0) throw new Error('turrent not found');
    return index;
  }

  /**
   * Warmup time is proportional to the turretInfex
   */
  @computed
  get warmupTime(): number {
    return this.turretIndex * START_OFFSET_PER_TURRET;
  }

  /**
   * Point to perimeter
   */
  @computed
  get perimeter() {
    return getPerimeter(this);
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
   * Is turret aiming?
   */
  @computed
  get isAiming(): boolean {
    return this.state === TurretStates.AIMING;
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
      case TurretStates.WARMUP: {
        return 'idle';
      }
      case TurretStates.AIMING: {
        return `aiming ${spinner(this.aimTimeRemaining)}`;
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
      case TurretStates.WARMUP: {
        return '';
      }
      case TurretStates.AIMING: {
        return '^';
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
   * Switch to idle state if no enemies
   */
  @modelAction
  maybeBecomeIdle() {
    if (!this.perimeter.areTargetsPresent) this.state = TurretStates.IDLE;
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
        if (this.perimeter.areTargetsPresent) {
          this.state = TurretStates.WARMUP;
          this.warmupTimeRemaining = this.warmupTime;
        }
        break;
      }
      case TurretStates.WARMUP: {
        this.warmupTimeRemaining = Math.max(
          0,
          this.warmupTimeRemaining - delta,
        );
        if (this.warmupTimeRemaining === 0) {
          this.state = TurretStates.AIMING;
          this.aimTimeRemaining = this.baseAttackCooldown;
        }
        break;
      }
      case TurretStates.AIMING: {
        this.maybeBecomeIdle();

        this.aimTimeRemaining = Math.max(0, this.aimTimeRemaining - delta);
        if (this.aimTimeRemaining === 0 && this.perimeter.areTargetsPresent) {
          this.state = TurretStates.FIRING;
          this.fireTimeRemaining = BASE_ATTACK_TIME;
        }
        break;
      }
      case TurretStates.FIRING: {
        this.maybeBecomeIdle();
        this.fireTimeRemaining = Math.max(0, this.fireTimeRemaining - delta);
        if (this.fireTimeRemaining === 0) {
          this.perimeter.attackEnemy(this.attackDamage);
          this.ammo -= 1;

          if (this.ammo === 0) {
            this.state = TurretStates.EMPTY;
          } else if (this.perimeter.areTargetsPresent) {
            this.state = TurretStates.AIMING;
            this.aimTimeRemaining = this.baseAttackCooldown;
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
