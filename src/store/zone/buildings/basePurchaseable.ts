import {
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
  ExtendedModel,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { ResourceNames } from '../resources/resourceNames';
import { BaseZoneEntity } from '../baseZoneEntity';

interface PurchaseCost {
  resource: ResourceNames;
  quantity: number;
}

abstract class _BasePurchaseable extends ExtendedModel(BaseZoneEntity, {
  quantity: tProp(types.number, 0),
}) {
  abstract baseCost: Array<PurchaseCost>;
  abstract costExponent: number;

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
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BasePurchaseable = decoratedModel(undefined, _BasePurchaseable, {
  currentCost: computed,
  affordable: computed,
  buy: modelAction,
});

type BasePurchaseable = _BasePurchaseable;
