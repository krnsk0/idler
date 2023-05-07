import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';
import { TurretNames } from '../zone/perimeter/turrets/turretNames';

@model(TechNames.KINETIC_WEAPONS)
export class KineticWeapons extends ExtendedModel(BaseTech, {}) {
  name = TechNames.KINETIC_WEAPONS;
  displayName = 'kinetic weapons';
  description =
    'devise an improvised, if primitive, means to defend the perimeter';
  powerCost = 50;
  transientUnlockCheck = () => true;
  turretsUnlocked = [TurretNames.BALLISTA];
}
