import { ExtendedModel, model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { ZoneEntity } from '../zoneEntity';
import { UpgradeNames } from './upgradeNames';
import { CompostingDrums } from './compostingDrums';
import { getTech } from '../../selectors';
import { TechNames } from '../../tech/techNames';
import { ProductionModifier, ProductionModifierDisplay } from '../sharedTypes';

@model('Upgrades')
export class Upgrades extends ExtendedModel(ZoneEntity, {
  [UpgradeNames.COMPOSTING_DRUMS]: tProp(
    types.model(CompostingDrums),
    () => new CompostingDrums({}),
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
   * Iterable list of only available upgrades
   */
  @computed
  get availableAsArray() {
    return this.unlockedAsArray.filter((upgrade) => !upgrade.purchased);
  }

  /**
   * Iterable list of only purchased upgrades
   */
  @computed
  get purchasedAsArray() {
    return this.unlockedAsArray.filter((upgrade) => upgrade.purchased);
  }

  /**
   * All upgrade modifiers
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

  /**
   * All upgrade modifiers, for display
   */
  @computed
  get totalProductionModifiersDisplay(): ProductionModifierDisplay[] {
    const modifiers: ProductionModifierDisplay[] = [];
    this.asArray.forEach(({ totalProductionModifiersDisplay }) => {
      totalProductionModifiersDisplay.forEach((modifier) => {
        if (modifier.percentageModifier > 0) {
          modifiers.push(modifier);
        }
      });
    });
    return modifiers;
  }
}
