import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';
import { computed } from 'mobx';

abstract class _BaseResource extends Model({
  id: idProp,
  quantity: tProp(types.number, 0),
  estimatedRate: tProp(types.number, 0),
}) {
  private changeSinceLastTick = 0;
  abstract displayName: string;
  abstract displayColor: string;
  abstract initialCap: number;

  /**
   * What is the storage cap?
   */
  get currentCap(): number {
    return this.initialCap;
  }

  /**
   * Ensures average rate of change is tracked.
   */
  tick(delta: number): void {
    if (delta > 0) this.estimatedRate = this.changeSinceLastTick / delta;
    this.changeSinceLastTick = 0;
  }

  /**
   * Increases quantity. Optionally can turn off tracking for average rate
   */
  increase(quantity: number, options?: { untracked?: boolean }): void {
    if (!options?.untracked) this.changeSinceLastTick += quantity;
    if (this.quantity + quantity > this.currentCap)
      throw new Error(
        'resource has gone above cap; caller should check for this',
      );
    else this.quantity += quantity;
  }

  /**
   * Decreases quantity. Optionally can turn off tracking for average rate
   */
  decrease(quantity: number, options?: { untracked?: boolean }): void {
    if (!options?.untracked) this.changeSinceLastTick -= quantity;
    if (this.quantity - quantity < 0)
      throw new Error(
        'resource has gone negative; caller should check for this',
      );
    this.quantity -= quantity;
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseResource = decoratedModel(undefined, _BaseResource, {
  currentCap: computed,
  tick: modelAction,
  increase: modelAction,
  decrease: modelAction,
});

type BaseResource = _BaseResource;
