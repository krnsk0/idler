import {
  idProp,
  modelAction,
  decoratedModel,
  ExtendedModel,
  tProp,
  types,
} from 'mobx-keystone';
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

abstract class _BaseBuilding extends ExtendedModel(ZoneEntity, {
  quantity: tProp(types.number, 0),
}) {
  abstract buildingName: BuildingNames;
  abstract displayName: string;
  abstract storage: Storage;
  abstract baseCost: Array<PurchaseCost>;
  abstract costExponent: number;
  abstract outputs: Array<ProducerOutput>;
  abstract inputs: Array<ProducerInput>;

  getStorageAmountByKey(resourceName: ResourceNames): number {
    return this.storage[resourceName] ?? 0;
  }

  /**
   * Resource cost adjusted according to exponentiation
   */
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
  get affordable(): boolean {
    return this.currentCost.every(({ resource, quantity }) => {
      return this.zoneResources[resource].quantity >= quantity;
    });
  }

  /**
   * Purhcases a new entity if possible
   */
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
  tick(delta: number): void {
    this.outputs.forEach((product) => {
      const resourceName = product.resource;

      this.zoneResources[resourceName].increase(
        product.quantityPerSecond * this.quantity * delta,
      );
    });
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseBuilding = decoratedModel(undefined, _BaseBuilding, {
  currentCost: computed,
  affordable: computed,
  buy: modelAction,
  tick: modelAction,
});
