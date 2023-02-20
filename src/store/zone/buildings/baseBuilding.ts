import { modelAction, ExtendedModel } from 'mobx-keystone';
import { computed } from 'mobx';
import { StorageProvider } from '../storageProvider';
import { BuildingNames } from './buildingNames';
import { getGui, getTech } from '../../selectors';
import {
  ProductionModifierDisplay,
  PurchaseCost,
  PurchaseCostDisplay,
} from '../sharedTypes';

export abstract class BaseBuilding extends ExtendedModel(StorageProvider, {}) {
  abstract name: BuildingNames;
  abstract displayName: string;
  abstract description: string;
  abstract baseCost: PurchaseCost[];
  abstract costExponent: number;

  /**
   * Responsible for managing when buildings are unlocked
   */
  observableUnlockCheck = () => {
    return getTech(this).unlockedBuildings.includes(this.name);
  };

  /**
   * Resource cost adjusted according to exponentiation
   */
  @computed
  get currentCost(): PurchaseCost[] {
    return this.baseCost.map(({ resource, quantity: baseCost }) => {
      return {
        resource,
        quantity: Math.floor(baseCost * this.costExponent ** this.quantity),
      };
    });
  }

  /**
   * Current cost with displayable names
   */
  @computed
  get currentCostDisplay(): PurchaseCostDisplay[] {
    return this.currentCost.map(({ resource, quantity }) => {
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
    return this.currentCost.every(({ resource, quantity }) => {
      return this.zoneResources[resource].quantity >= quantity;
    });
  }

  /**
   * Is the button expanded?
   */
  @computed
  get isExpanded(): boolean {
    return getGui(this).expandedShipColonyButton === this.name;
  }

  /**
   * Modifier display
   */
  get totalProductionModifiersDisplay(): ProductionModifierDisplay[] {
    return [
      ...this.zoneJobs.totalProductionModifiersDisplay,
      ...this.zoneUpgrades.totalProductionModifiersDisplay,
    ].filter(({ building }) => building === this.name);
  }

  /**
   * Expand this button
   */
  @modelAction
  expandButton() {
    getGui(this).setExpandedShipColonyButton(this.name);
  }

  /**
   * Purhcases a new entity if possible
   */
  @modelAction
  buy(quantity: number): void {
    if (this.affordable) {
      this.currentCost.forEach(({ resource, quantity }) => {
        this.zoneResources[resource].decrease(quantity, { untracked: true });
      });
      this.quantity += quantity;
    }
  }

  /**
   * Immediately build
   */
  @modelAction
  cheat(quantity?: number): void {
    console.log(`CHEAT: BUILDING ${this.name}`);
    this.quantity += quantity ? quantity : 1;
  }

  /**
   * Attempts to run production
   */
  @modelAction
  tick(delta: number): void {
    this.runProduction(delta);
  }
}
