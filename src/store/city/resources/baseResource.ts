import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';
import { computed } from 'mobx';

export abstract class _BaseResource extends Model({
  id: idProp,
  quantity: tProp(types.number, 0),
  estimatedRate: tProp(types.number, 0),
}) {
  private changeSinceLastTick = 0;
  abstract displayName: string;
  abstract displayColor: string;

  /**
   * Estimated rate of change suitable for display
   */
  get estimatedRateDisplay(): string {
    const fixed = this.estimatedRate.toFixed(2);
    if (this.estimatedRate > 0) return `+${fixed}`;
    else if (this.estimatedRate < 0) return `-${fixed}`;
    else return `${fixed}`;
  }

  /**
   * Ensures average rate of change is tracked.
   */
  tick(delta: number): void {
    this.estimatedRate = this.changeSinceLastTick / delta;
    this.changeSinceLastTick = 0;
  }

  /**
   * Increases quantity. Optionally can turn off tracking for average rate
   */
  increase(quantity: number, options?: { untracked?: boolean }): void {
    if (!options?.untracked) this.changeSinceLastTick += quantity;
    this.quantity += quantity;
  }

  /**
   * Decreases quantity. Optionally can turn off tracking for average rate
   */
  decrease(quantity: number, options?: { untracked?: boolean }): void {
    if (!options?.untracked) this.changeSinceLastTick -= quantity;
    this.quantity -= quantity;
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseResource = decoratedModel(undefined, _BaseResource, {
  estimatedRateDisplay: computed,
  tick: modelAction,
  increase: modelAction,
  decrease: modelAction,
});

type BaseResource = _BaseResource;
