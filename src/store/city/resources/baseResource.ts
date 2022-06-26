import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';

export abstract class _BaseResource extends Model({
  id: idProp,
  quantity: tProp(types.number, 0),
  rateOfChange: tProp(types.number, 0),
}) {
  changeSinceLastTick = 0;
  abstract displayName: string;
  abstract displayColor: string;

  tick(delta: number): void {
    // console.log('this.changeSinceLastTick', this.changeSinceLastTick);
    this.rateOfChange = this.changeSinceLastTick / delta;
    this.changeSinceLastTick = 0;
  }

  increase(quantity: number): void {
    this.changeSinceLastTick += quantity;
    this.quantity += quantity;
  }

  decrease(quantity: number): void {
    this.changeSinceLastTick -= quantity;
    this.quantity -= quantity;
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseResource = decoratedModel(undefined, _BaseResource, {
  tick: modelAction,
  increase: modelAction,
  decrease: modelAction,
});

type BaseResource = _BaseResource;
