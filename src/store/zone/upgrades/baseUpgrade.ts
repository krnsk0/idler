import { ExtendedModel, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { UpgradeNames } from './upgradeNames';
import { getTech, getGui } from '../../selectors';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { ZoneEntity } from '../zoneEntity';

export interface ProductionModifier {
  buildingName: BuildingNames;
  resourceName: ResourceNames;
  percentageModifier: number;
}

export interface ProductionModifierDisplay {
  buildingDisplayName: string;
  resourceDisplayName: string;
  percentageModifier: number;
}

export abstract class BaseUpgrade extends ExtendedModel(ZoneEntity, {
  /**
   * Has this upgrade been purchased for this zone?
   */
  purchased: tProp(types.boolean, false),
}) {
  abstract name: UpgradeNames;
  abstract displayName: string;
  abstract description: string;

  /**
   * Production modifiers
   */
  abstract productionModifiers: ProductionModifier[];

  /**
   * Responsible for managing when jobs are unlocked
   */
  observableUnlockCheck = () => {
    return getTech(this).unlockedUpgrades.includes(this.name);
  };

  @computed
  get displayEffects(): ProductionModifierDisplay[] {
    return this.productionModifiers.map(
      ({ buildingName, resourceName, percentageModifier }) => {
        return {
          percentageModifier,
          resourceDisplayName: this.zoneResources[resourceName].displayName,
          buildingDisplayName: this.zoneBuildings[buildingName].displayName,
        };
      },
    );
  }

  // @computed
  get totalProductionModifiers(): ProductionModifier[] {
    return this.productionModifiers.map(
      ({ buildingName, resourceName, percentageModifier }) => {
        return {
          percentageModifier: percentageModifier,
          buildingName,
          resourceName,
        };
      },
    );
  }

  /**
   * Is the row expanded?
   */
  @computed
  get isExpanded(): boolean {
    return getGui(this).expandedUpgradeRow === this.name;
  }

  /**
   * Expand this button
   */
  @modelAction
  expandButton() {
    getGui(this).setExpandedUpgradeRow(this.name);
  }
}
