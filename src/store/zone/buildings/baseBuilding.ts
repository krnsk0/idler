import { modelAction, ExtendedModel, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { ResourceNames } from '../resources/resourceNames';
import { BuildingNames } from './buildingNames';

type Storage = {
  [key in ResourceNames]?: number;
};

interface PurchaseCost {
  resource: ResourceNames;
  quantity: number;
}

interface ProducerOutput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface ProducerInput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

export abstract class BaseBuilding extends ExtendedModel(ZoneEntity, {
  quantity: tProp(types.number, 0),
}) {
  abstract buildingName: BuildingNames;
  abstract displayName: string;
  abstract storage: Storage;
  abstract baseCost: Array<PurchaseCost>;
  abstract costExponent: number;
  abstract outputs: Array<ProducerOutput>;
  abstract inputs: Array<ProducerInput>;

  /**
   * Given the name of a resource, tells the caller how much of that resource
   * this building can store
   */
  getStorageAmountByKey(resourceName: ResourceNames): number {
    return this.storage[resourceName] ?? 0;
  }

  /**
   * Resource cost adjusted according to exponentiation
   */
  @computed
  get currentCost(): Array<PurchaseCost> {
    return this.baseCost.map(({ resource, quantity: baseCost }) => {
      return {
        resource,
        quantity: baseCost * this.costExponent ** this.quantity,
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
   * TODO: only run when we have enough inputs
   * TODO: stop production when hitting maximums
   */
  @modelAction
  tick(delta: number): void {
    this.outputs.forEach((product) => {
      const resourceName = product.resource;

      this.zoneResources[resourceName].increase(
        product.quantityPerSecond * this.quantity * delta,
      );
    });
  }
}
