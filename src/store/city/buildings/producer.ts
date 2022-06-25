import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';
import { getCity } from '../city';
import { Resources } from '../resources/resources';

type ProducerFn = (resources: Resources) => void;

export abstract class _Producer extends Model({
  id: idProp,
  qty: tProp(types.number, 0),
}) {
  abstract displayName: string;
  abstract producerFns: Array<ProducerFn>;

  tick(): void {
    const city = getCity(this);
    this.producerFns.forEach((producerFn) => producerFn(city.resources));
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
