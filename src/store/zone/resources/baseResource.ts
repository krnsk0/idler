import { tProp, types, modelAction, ExtendedModel } from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { ResourceNames } from './resourceNames';

export abstract class BaseResource extends ExtendedModel(ZoneEntity, {
  quantity: tProp(types.number, 0),
  estimatedRate: tProp(types.number, 0),
}) {
  abstract name: ResourceNames;
  abstract displayName: string;
  abstract displayColor: string;
  abstract initialCap: number;
  private changeSinceLastTick = 0;

  /**
   * What is the storage cap for this resource?
   */
  @computed
  get currentCap(): number {
    return this.zone.buildings.asArray.reduce((output, building) => {
      return (
        output + building.getStorageAmountByKey(this.name) * building.quantity
      );
    }, this.initialCap);
  }

  /**
   * Ensures average rate of change is tracked.
   */
  @modelAction
  tick(delta: number): void {
    if (delta > 0) this.estimatedRate = this.changeSinceLastTick / delta;
    this.changeSinceLastTick = 0;
  }

  /**
   * Increases quantity. Optionally can turn off tracking for average rate
   */
  @modelAction
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
  @modelAction
  decrease(quantity: number, options?: { untracked?: boolean }): void {
    if (!options?.untracked) this.changeSinceLastTick -= quantity;
    if (this.quantity - quantity < 0)
      throw new Error(
        'resource has gone negative; caller should check for this',
      );
    this.quantity -= quantity;
  }
}
