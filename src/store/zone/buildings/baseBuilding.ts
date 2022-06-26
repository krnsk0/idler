import {
  idProp,
  modelAction,
  decoratedModel,
  ExtendedModel,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { ResourceNames } from '../resources/resourceNames';
interface ResourceStorage {
  resource: ResourceNames;
  storageAmount: number;
}

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
  id: idProp,
}) {
  abstract displayName: string;
  abstract storage: Array<ResourceStorage>;
  abstract baseCost: Array<PurchaseCost>;
  abstract costExponent: number;
  abstract outputs: Array<ProducerOutput>;
  abstract inputs: Array<ProducerInput>;

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

type BaseBuilding = _BaseBuilding;
