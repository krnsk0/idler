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

export abstract class BaseTurret extends Model({
  id: idProp,
  state: tProp(types.enum(TurretStates), TurretStates.EMPTY),
  ammo: tProp(types.number, 0),
  ammoLoadTimeRemaining: tProp(types.number, 0),
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
   * Ammo Loaded
   */
  @computed
  get isAmmoFull() {
    return this.ammo === this.ammoCapacity;
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
  get isLoading() {
    return this.ammoLoadTimeRemaining > 0;
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
        return 'Reloading';
      }
      case TurretStates.IDLE: {
        return 'Idle';
      }
      case TurretStates.AIMING: {
        return 'Aiming';
      }
      case TurretStates.FIRING: {
        return 'Firing';
      }
      default: {
        exhaustiveGuard(this.state);
      }
    }
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
        break;
      }
      case TurretStates.IDLE: {
        break;
      }
      case TurretStates.AIMING: {
        break;
      }
      case TurretStates.FIRING: {
        break;
      }
      default: {
        exhaustiveGuard(this.state);
      }
    }
  }
}
