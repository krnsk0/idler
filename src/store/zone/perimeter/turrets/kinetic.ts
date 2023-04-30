import { model, ExtendedModel } from 'mobx-keystone';
import { TurretNames } from './turretNames';
import { BaseTurret } from './baseTurret';

@model(TurretNames.KINETIC)
export class KineticTurret extends ExtendedModel(BaseTurret, {}) {
  name = TurretNames.KINETIC;
  displayName = 'kinetic arbalest';
  description = 'acceleratate lithoid matter to lethal velocities';
}
