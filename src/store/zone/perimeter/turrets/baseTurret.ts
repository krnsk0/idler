import { Model, idProp, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { TurretNames } from './turretNames';

export abstract class BaseTurret extends Model({
  id: idProp,
}) {
  abstract name: TurretNames;
  abstract displayName: string;
  abstract description: string;
}
