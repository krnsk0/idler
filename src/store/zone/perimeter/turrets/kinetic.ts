import { model, ExtendedModel } from 'mobx-keystone';
import { TurretNames } from './turretNames';
import { BaseTurret } from './baseTurret';
import { ResourceNames } from '../../resources/resourceNames';

@model(TurretNames.KINETIC)
export class KineticTurret extends ExtendedModel(BaseTurret, {}) {
  // splash
  name = TurretNames.KINETIC;
  displayName = 'kinetic impactor';
  description = 'acceleratate lithoid mass to lethal velocities';

  // ammo
  baseAmmoCost = [{ resource: ResourceNames.ROCK, quantity: 3 }];
  baseAmmoCapacity = 500;
  baseAmmoLoadTime = 8; // seconds

  // attack
  baseAttackDamage = 1;
  baseAttackCooldown = 5;
}
