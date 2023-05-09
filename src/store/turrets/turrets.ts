import { Model, model, tProp, types } from 'mobx-keystone';
import { Autoballista } from './autoballista';
import { computed } from 'mobx';
import { TurretNames } from './turretNames';
import { BaseTurret } from './baseTurret';
import { enumKeys } from '../../utils/enumKeys';

type TurretFactory = () => BaseTurret;

const turretFactoryMapping: Record<TurretNames, TurretFactory> = {
  [TurretNames.AUTOBALLISTA]: () => new Autoballista({}),
};

interface TurretPurchaseListing {
  turretFactory: TurretFactory;
  instance: BaseTurret;
}

/**
 * Instances of turrets actually used for combat are stored in zone data,
 * and there are often multiples of them
 *
 * This model exists to store  single global isntances of turrets to run
 * theri unlock logic and to allow us to reason about which are purchaseable
 * based on this logic
 */
@model('Turrets')
export class Turrets extends Model({
  [TurretNames.AUTOBALLISTA]: tProp(
    types.model(Autoballista),
    () => new Autoballista({}),
  ),
}) {
  /**
   * Returns an iterable list of the building models
   */
  @computed
  get asArray() {
    return enumKeys(TurretNames).map((name) => {
      return this[name];
    });
  }

  /**
   * Iterable list of only unlocked actions
   */
  @computed
  get unlockedAsArray() {
    return this.asArray.filter((action) => action.unlocked);
  }

  /**
   * All purchaseable turrets with factories to allow purchase
   */
  @computed
  get purchaseable(): TurretPurchaseListing[] {
    return this.unlockedAsArray.map((turret) => {
      const turretFactory = turretFactoryMapping[turret.name];
      return {
        turretFactory: turretFactory,
        instance: turret,
      };
    });
  }
}
