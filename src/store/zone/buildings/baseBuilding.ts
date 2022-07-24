import { modelAction, ExtendedModel, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { ProducerConsumer } from '../producerConsumer';
import { ResourceNames } from '../resources/resourceNames';
import { BuildingNames } from './buildingNames';
import { getResources } from '../resources/resources';
import { getTech } from '../../tech/tech';
import { TechEffectNames } from '../../tech/techEffectTypes';

interface Storage {
  resource: ResourceNames;
  quantity: number;
}

interface PurchaseCost {
  resource: ResourceNames;
  quantity: number;
}

interface PurchaseCostDisplay {
  resourceDisplayName: string;
  quantity: number;
}

interface BuildingStorageDisplay {
  resourceDisplayName: string;
  quantity: number;
}

export abstract class BaseBuilding extends ExtendedModel(ProducerConsumer, {
  unlocked: tProp(types.boolean, false),
}) {
  abstract name: BuildingNames;
  abstract displayName: string;
  abstract description: string;
  abstract splashText: string;
  abstract storage: Storage[];
  abstract baseCost: PurchaseCost[];
  abstract costExponent: number;
  abstract unlockWhen: () => boolean;

  /**
   * Given the name of a resource, tells the caller how much of that resource
   * this building can store
   */
  getStorageAmountByKey(resourceName: ResourceNames): number {
    const entry = this.storage.find((entry) => entry.resource === resourceName);
    return entry ? entry.quantity : 0;
  }

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
      return {
        resourceDisplayName: getResources(this)[resource].displayName,
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
   * Storage with displayable names
   */
  @computed
  get displayStorage(): BuildingStorageDisplay[] {
    return this.storage.map(({ resource, quantity }) => {
      return {
        resourceDisplayName: getResources(this)[resource].displayName,
        quantity,
      };
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

  /**
   * Runs an unlock check
   */
  @modelAction
  unlockCheck(): void {
    if (!this.unlocked) {
      this.unlocked = this.unlockWhen();
    }
  }
}
