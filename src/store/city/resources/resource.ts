import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
  computed,
} from 'mobx-keystone';

export abstract class _Resource extends Model({
  id: idProp,
  quantity: tProp(types.number, 0),
}) {
  abstract displayName: string;
  abstract displayColor: string;

  displayQuantity(): string {
    return this.quantity.toFixed(2);
  }

  increase(quantity: number): void {
    this.quantity += quantity;
  }

  decrease(quantity: number): void {
    this.quantity -= quantity;
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const Resource = decoratedModel(undefined, _Resource, {
  displayQuantity: computed,
  increase: modelAction,
  decrease: modelAction,
});

type Resource = _Resource;
