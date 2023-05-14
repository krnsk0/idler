import { Model, model, tProp, types } from 'mobx-keystone';
import { Autoballista } from './autoballista';
import { computed } from 'mobx';
import { TurretNames } from './turretNames';
import { BaseTurret } from './baseTurret';
import { enumKeys } from '../../../../utils/enumKeys';

type TurretFactory = () => BaseTurret;

const turretFactoryMapping: Record<TurretNames, TurretFactory> = {
  [TurretNames.AUTOBALLISTA]: () => new Autoballista({}),
};

interface TurretPurchaseListing {
  turretFactory: TurretFactory;
  instance: BaseTurret;
}

/**
 * These turret models are used for unlock/purchase, not combat.
 */
@model('TurretMenu')
export class TurretMenu extends Model({
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
