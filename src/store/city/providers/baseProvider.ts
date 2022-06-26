import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { City, getCity } from '../city';
import { ResourceNames } from '../resources/resourceNames';

interface PurchaseCost {
  resource: ResourceNames;
  quantity: number;
}

export abstract class _BaseProvider extends Model({
  id: idProp,
  quantity: tProp(types.number, 0),
}) {
  abstract displayName: string;
  abstract baseCost: Array<PurchaseCost>;
  abstract costExponent: number;
  private get city(): City {
    return getCity(this);
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
   * Can this building be bought?
   */
  get affordable(): boolean {
    return this.currentCost.every(({ resource, quantity }) => {
      return this.city.resources[resource].quantity >= quantity;
    });
  }

  /**
   * Purhcases a new building if possible
   */
  buy(quantity: number): void {
    if (this.affordable) {
      this.currentCost.forEach(({ resource, quantity }) => {
        this.city.resources[resource].decrease(quantity, { untracked: true });
      });
      this.quantity += quantity;
    }
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseProvider = decoratedModel(undefined, _BaseProvider, {
  currentCost: computed,
  affordable: computed,
  buy: modelAction,
});

type BaseProvider = _BaseProvider;
