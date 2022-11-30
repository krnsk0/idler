import { modelAction, ExtendedModel, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { StorageProvider } from '../storageProvider';
import { ResourceNames } from '../resources/resourceNames';
import { BuildingNames } from './buildingNames';
import { getResources } from '../resources/resources';
import { getTech } from '../../tech/tech';
import { TechEffectNames } from '../../tech/techEffectTypes';

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

export abstract class BaseBuilding extends ExtendedModel(StorageProvider, {}) {
  abstract name: BuildingNames;
  abstract displayName: string;
  abstract description: string;
  abstract splashText: string;
  abstract baseCost: PurchaseCost[];
  abstract costExponent: number;

  /**
   * Resource cost adjusted according to exponentiation
   */
  @computed
  get currentCost(): PurchaseCost[] {
    return this.baseCost.map(({ resource, quantity: baseCost }) => {
      return {
        resource,
        quantity: baseCost * this.costExponent ** this.quantity,
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
   * Can this entity be bought?
   */
  @computed
  get affordable(): boolean {
    return this.currentCost.every(({ resource, quantity }) => {
      return this.zoneResources[resource].quantity >= quantity;
    });
  }

  /**
   * Helper intended to be called in unlockWhen
   */
  @computed
  get isUnlockedByTech(): boolean {
    return !!getTech(this).allTechEffects.find((effect) => {
      return (
        effect.kind === TechEffectNames.BUILDING_UNLOCK &&
        effect.buildingName === this.name
      );
    });
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
   * Attempts to run production

   */
  @modelAction
  tick(delta: number): void {
    this.runProduction(delta);
  }
}