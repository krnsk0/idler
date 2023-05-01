import { Model, idProp, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { TurretNames } from './turretNames';
import { PurchaseCost } from '../../sharedTypes';

enum TurretStates {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  FIRING = 'FIRING',
}

export abstract class BaseTurret extends Model({
  id: idProp,
  ammoLoaded: tProp(types.number, 0),
  ammoLoadTimeRemaining: tProp(types.number, 0),
  attackCooldownRemaining: tProp(types.number, 0),
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
    return this.ammoLoaded === this.ammoCapacity;
  }

  /**
   * Are we out of ammo
   */
  @computed
  get isAmmoEmpty() {
    return this.ammoLoaded === 0;
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
}
