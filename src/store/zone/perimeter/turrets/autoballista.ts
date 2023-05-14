import { model, ExtendedModel } from 'mobx-keystone';
import { TurretNames } from './turretNames';
import { BaseTurret } from './baseTurret';
import { ResourceNames } from '../../resources/resourceNames';

@model(TurretNames.AUTOBALLISTA)
export class Autoballista extends ExtendedModel(BaseTurret, {}) {
  // splash
  name = TurretNames.AUTOBALLISTA;
  displayName = 'auto​ballista'; // note the zero-width space
  description = 'acceleratate lithoid matter to lethal velocities';

  // ammo
  baseAmmoCost = [{ resource: ResourceNames.ROCK, quantity: 3 }];
  baseAmmoCapacity = 5;
  baseAmmoLoadTime = 8; // seconds

  // attack
  baseAttackDamage = 1;
  baseAttackCooldown = 5;

  // purchase
  purchaseCost = [
    { resource: ResourceNames.ROCK, quantity: 20 },
    { resource: ResourceNames.LUMBER, quantity: 25 },
    { resource: ResourceNames.ALLOY, quantity: 10 },
  ];
}
