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

interface Cost {
  resource: ResourceNames;
  quantity: number;
}

interface Output {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface Input {
  resource: ResourceNames;
  quantityPerSecond: number;
}

export abstract class _BaseProducer extends Model({
  id: idProp,
  quantity: tProp(types.number, 0),
}) {
  abstract displayName: string;
  abstract baseCost: Array<Cost>;
  abstract costExponent: number;
  abstract outputs: Array<Output>;
  abstract inputs: Array<Input>;

  private get city(): City {
    return getCity(this);
  }

  get currentCost(): Array<Cost> {
    return this.baseCost.map(({ resource, quantity: baseCost }) => {
      return {
        resource,
        quantity: baseCost * this.costExponent ** this.quantity,
      };
    });
  }

  get affordable(): boolean {
    return this.currentCost.every(({ resource, quantity }) => {
      return this.city.resources[resource].quantity >= quantity;
    });
  }

  tick(): void {
    this.outputs.forEach((product) => {
      const resourceName = product.resource;
      this.city.resources[resourceName].increase(0.01 * this.quantity);
    });
  }

  buy(quantity: number): void {
    if (this.affordable) {
      this.currentCost.forEach(({ resource, quantity }) => {
        this.city.resources[resource].decrease(quantity);
      });
      this.quantity += quantity;
    }
  }

  sell(quantity: number): void {
    this.quantity -= quantity;
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseProducer = decoratedModel(undefined, _BaseProducer, {
  currentCost: computed,
  affordable: computed,
  tick: modelAction,
  buy: modelAction,
  sell: modelAction,
});

type BaseProducer = _BaseProducer;
