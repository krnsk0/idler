import { tProp, types, modelAction, ExtendedModel } from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { ResourceNames } from './resourceNames';
import { getTech } from '../../tech/tech';
import { TechEffectNames } from '../../tech/techEffectTypes';

interface ProductionConsumptionDisplay {
  producerDisplayName: string;
  producerQuantity: number;
  quantityPerSecond: number;
}
export abstract class BaseResource extends ExtendedModel(ZoneEntity, {
  unlocked: tProp(types.boolean, false),
  quantity: tProp(types.number, 0),
  estimatedRate: tProp(types.number, 0),
}) {
  abstract name: ResourceNames;
  abstract displayName: string;
  abstract initialCap: number;
  abstract unlockWhen: () => boolean;
  private changeSinceLastTick = 0;
  highlightQuantity = false;
  highlightQuantityAnimationDuration = 500;

  /**
   * What is the storage cap for this resource?
   */
  @computed
  get currentCap(): number {
    return this.zone.producers.asArray.reduce((output, building) => {
      return (
        output + building.getStorageAmountByKey(this.name) * building.quantity
      );
    }, this.initialCap);
  }

  /**
   * Helper intended to be called in unlockWhen
   */
  @computed
  get isUnlockedByTech(): boolean {
    return !!getTech(this).allTechEffects.find((effect) => {
      return (
        effect.kind === TechEffectNames.RESOURCE_UNLOCK &&
        effect.resourceName === this.name
      );
    });
  }

  /**
   * Estimate production per second
   */
  @computed
  get productionPerSecond(): Array<ProductionConsumptionDisplay> {
    // return [...this.zoneJobs.asArray, ...this.zoneBuildings.asArray]
    return [];
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
   * Runs an unlock check. Resources always unlock when they are first nonzero
   */
  @modelAction
  unlockCheck(): void {
    if (!this.unlocked) {
      this.unlocked = this.unlockWhen();
    }
  }

  /**
   * Increases quantity. Optionally can turn off tracking for average rate
   */
  @modelAction
  increase(quantity: number, options?: { untracked?: boolean }): void {
    if (!options?.untracked) this.changeSinceLastTick += quantity;
    if (this.quantity + quantity > this.currentCap) {
      this.quantity = this.currentCap;
    } else {
      this.quantity += quantity;
    }
  }

  /**
   * Decreases quantity. Optionally can turn off tracking for average rate
   */
  @modelAction
  decrease(quantity: number, options?: { untracked?: boolean }): void {
    if (!options?.untracked) this.changeSinceLastTick -= quantity;
    if (this.quantity - quantity < 0) {
      this.quantity = 0;
    } else {
      this.quantity -= quantity;
    }
  }
}
