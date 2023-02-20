import { ExtendedModel, model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { ZoneEntity } from '../zoneEntity';
import { UpgradeNames } from './upgradeNames';
import { CompostingCenter } from './compostingCenter';
import { ProductionModifier } from './baseUpgrade';
import { getTech } from '../../selectors';
import { TechNames } from '../../tech/techNames';

@model('Upgrades')
export class Upgrades extends ExtendedModel(ZoneEntity, {
  [UpgradeNames.COMPOSTING_CENTER]: tProp(
    types.model(CompostingCenter),
    () => new CompostingCenter({}),
  ),
}) {
  transientUnlockCheck = () => {
    return (
      !!this.unlockedAsArray.length &&
      getTech(this)[TechNames.ZONE_UPGRADES].researched
    );
  };
  observableUnlockCheck = () => true;

  /**
   * Returns an iterable list of the upgrade models
   */
  @computed
  get asArray() {
    return enumKeys(UpgradeNames).map((name) => {
      return this[name];
    });
  }

  /**
   * Iterable list of only unlocked upgrades
   */
  @computed
  get unlockedAsArray() {
    return this.asArray.filter((upgrade) => upgrade.unlocked);
  }

  /**
   * All job modifiers
   */
  @computed
  get totalProductionModifiers(): ProductionModifier[] {
    const modifiers: ProductionModifier[] = [];
    this.asArray.forEach(({ totalProductionModifiers }) => {
      totalProductionModifiers.forEach((modifier) => {
        if (modifier.percentageModifier > 0) {
          modifiers.push(modifier);
        }
      });
    });
    return modifiers;
  }
}
