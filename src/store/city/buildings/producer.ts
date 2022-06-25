import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';

export abstract class _Producer extends Model({
  id: idProp,
  qty: tProp(types.number, 0),
}) {
  abstract displayName: string;
  abstract tick(): void;

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
