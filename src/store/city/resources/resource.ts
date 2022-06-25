import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';

export abstract class _Resource extends Model({
  id: idProp,
  qty: tProp(types.number, 0),
}) {
  abstract displayName: string;
  abstract displayColor: string;

  increase(qty: number): void {
    this.qty += qty;
  }

  decrease(qty: number): void {
    this.qty -= qty;
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const Resource = decoratedModel(undefined, _Resource, {
  increase: modelAction,
  decrease: modelAction,
});

type Resource = _Resource;
