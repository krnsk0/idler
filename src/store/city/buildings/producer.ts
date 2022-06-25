import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';
import { getCity } from '../city';
import { ResourceNames } from '../resources/resources';

interface Product {
  resource: ResourceNames;
  qty: number;
}

export abstract class _Producer extends Model({
  id: idProp,
  qty: tProp(types.number, 0),
}) {
  abstract displayName: string;
  abstract products: Array<Product>;

  tick(): void {
    const city = getCity(this);
    this.products.forEach((product) => {
      const resourceName = product.resource;
      city.resources[resourceName].increase(0.01 * this.qty);
    });
  }
  buy(qty: number): void {
    this.qty += qty;
  }

  sell(qty: number): void {
    this.qty -= qty;
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const Producer = decoratedModel(undefined, _Producer, {
  buy: modelAction,
  sell: modelAction,
});

type Producer = _Producer;
