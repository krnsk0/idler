import { tProp, types, modelAction, ExtendedModel } from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { ResourceNames } from './resourceNames';
import { getTech } from '../../tech/tech';
import { TechEffectNames } from '../../tech/techEffectTypes';

export interface ProductionConsumptionDisplay {
  producerConsumerDisplayName: string;
  producerConsumerQuantity: number;
  resourceQuantityPerSecond: number;
}
export interface StorageSummaryDisplay {
  storageProviderDisplayName: string;
  storageProviderQuantity: number;
  storage: number;
}
export abstract class BaseResource extends ExtendedModel(ZoneEntity, {
  quantity: tProp(types.number, 0),
  estimatedRate: tProp(types.number, 0),
}) {
  abstract name: ResourceNames;
  abstract displayName: string;
  abstract initialCap: number;
  private changeSinceLastTick = 0;

  /**
   * State for temporary highlight
   * i.e. when a colonist fies
   */
  showHighlight = false;
  highlightAnimationDuration = 500;

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
  get productionSummary(): ProductionConsumptionDisplay[] {
    const productionSummary: ProductionConsumptionDisplay[] = [];
    [...this.zoneJobs.asArray, ...this.zoneBuildings.asArray].forEach(
      (producer) => {
        const production = producer.productionPerSecond.find(
          ({ resource }) => resource === this.name,
        );
        if (production && !!production.quantityPerSecond) {
          productionSummary.push({
            producerConsumerDisplayName: producer.displayName,
            producerConsumerQuantity: producer.quantity,
            resourceQuantityPerSecond: production.quantityPerSecond,
          });
        }
      },
    );
    return productionSummary;
  }

  /**
   * Estimate consumption per second
   */
  @computed
  get consumptionSummary(): ProductionConsumptionDisplay[] {
    const consumptionSummary: ProductionConsumptionDisplay[] = [];
    [...this.zoneJobs.asArray, ...this.zoneBuildings.asArray].forEach(
      (producer) => {
        const production = producer.consumptionPerSecond.find(
          ({ resource }) => resource === this.name,
        );
        if (production) {
          consumptionSummary.push({
            producerConsumerDisplayName: producer.displayName,
            producerConsumerQuantity: producer.quantity,
            resourceQuantityPerSecond: production.quantityPerSecond,
          });
        }
      },
    );
    return consumptionSummary;
  }

  /**
   * Estimate storage
   */
  @computed
  get storageSummary(): StorageSummaryDisplay[] {
    const storageSummary: StorageSummaryDisplay[] = [];
    if (this.initialCap) {
      storageSummary.push({
        storageProviderDisplayName: 'ship',
        storageProviderQuantity: 0,
        storage: this.initialCap,
      });
    }
    [...this.zoneBuildings.asArray].forEach((building) => {
      const storage = building.getStorageAmountByKey(this.name);
      if (storage) {
        storageSummary.push({
          storageProviderDisplayName: building.displayName,
          storageProviderQuantity: building.quantity,
          storage,
        });
      }
    });
    return storageSummary;
  }

  /**
   * Ensures average rate of change is tracked, and also reduces to cap
   */
  @modelAction
  tick(delta: number): void {
    if (delta > 0) this.estimatedRate = this.changeSinceLastTick / delta;
    this.changeSinceLastTick = 0;
    if (this.quantity > this.currentCap) this.quantity = this.currentCap;
  }

  /**
   * Increases quantity. Optionally can turn off tracking for average rate
   */
  @modelAction
  increase(quantity: number, options?: { untracked?: boolean }): void {
    if (!options?.untracked) this.changeSinceLastTick += quantity;
    this.quantity += quantity;
  }

  /**
   * Sets to cap or to a value. Useful for debug
   */
  @modelAction
  cheat(quantity?: number): void {
    console.log(`CHEAT: CREATING ${this.name}`);
    this.quantity = quantity ? quantity : this.currentCap;
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
