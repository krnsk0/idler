import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';
import { getCity } from '../city';
import { ResourceNames } from '../resources/resourceNames';

interface Output {
  resource: ResourceNames;
  quantity: number;
}

interface Input {
  resource: ResourceNames;
  quantity: number;
}

export abstract class _BaseProducer extends Model({
  id: idProp,
  quantity: tProp(types.number, 0),
}) {
  abstract displayName: string;
  abstract outputs: Array<Output>;
  abstract inputs: Array<Input>;

  tick(): void {
    const city = getCity(this);
    this.outputs.forEach((product) => {
      const resourceName = product.resource;
      city.resources[resourceName].increase(0.01 * this.quantity);
    });
  }

  buy(quantity: number): void {
    this.quantity += quantity;
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
  buy: modelAction,
  sell: modelAction,
});

type BaseProducer = _BaseProducer;
