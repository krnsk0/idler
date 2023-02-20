import { ExtendedModel, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { UpgradeNames } from './upgradeNames';
import { getTech, getGui } from '../../selectors';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { ZoneEntity } from '../zoneEntity';

interface PurchaseCost {
  resource: ResourceNames;
  quantity: number;
}

interface PurchaseCostDisplay {
  resourceDisplayName: string;
  isSatisfied: boolean;
  availableQuantity: number;
  storageConstrained: boolean;
  quantity: number;
}

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
  abstract cost: PurchaseCost[];
  abstract productionModifiers: ProductionModifier[];

  /**
   * Responsible for managing when jobs are unlocked
   */
  observableUnlockCheck = () => {
    return getTech(this).unlockedUpgrades.includes(this.name);
  };

  /**
   * Current cost with displayable names
   */
  @computed
  get currentCostDisplay(): PurchaseCostDisplay[] {
    return this.cost.map(({ resource, quantity }) => {
      const resourceModel = this.zoneResources[resource];
      return {
        resourceDisplayName: resourceModel.displayName,
        isSatisfied: resourceModel.quantity >= quantity,
        availableQuantity: resourceModel.quantity,
        storageConstrained: quantity > resourceModel.currentCap,
        quantity,
      };
    });
  }

  /**
   * Is storage constrained for any costs
   */
  @computed
  get isStorageConstrainted(): boolean {
    return this.currentCostDisplay.some(
      ({ storageConstrained }) => storageConstrained,
    );
  }

  /**
   * Can this entity be bought?
   */
  @computed
  get affordable(): boolean {
    return this.cost.every(({ resource, quantity }) => {
      return this.zoneResources[resource].quantity >= quantity;
    });
  }

  /**
   * Effects of this upgrade for display purposes
   */
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

  /**
   * The active production modifiers, when purchased
   */
  @computed
  get totalProductionModifiers(): ProductionModifier[] {
    return this.purchased ? this.productionModifiers : [];
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

  /**
   * Purhcases a new entity if possible
   */
  @modelAction
  buy(): void {
    if (this.affordable) {
      this.cost.forEach(({ resource, quantity }) => {
        this.zoneResources[resource].decrease(quantity, { untracked: true });
      });
      this.purchased = true;
    }
  }

  /**
   * Immediately build
   */
  @modelAction
  cheat(): void {
    console.log(`CHEAT: UPGRADE ${this.name}`);
    this.purchased = true;
  }
}
