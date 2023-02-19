import { tProp, types, modelAction, ExtendedModel } from 'mobx-keystone';
import { computed } from 'mobx';
import { ResourceNames } from './resourceNames';
import { getGui } from '../../selectors';
import { Countable } from '../countable';

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
export abstract class BaseResource extends ExtendedModel(Countable, {
  /**
   * Used to show change over time.
   * Can be null if no change has taken place this tick.
   * Zero means that increase and decrease cancelled out. This matters
   * as we might want to display a value of zero when they do cancel, whereas
   * we might not want to display a null value
   */
  estimatedRate: tProp(types.maybeNull(types.number), null),
}) {
  /**
   * For reflection
   */
  abstract name: ResourceNames;

  /**
   * User-facing
   */
  abstract displayName: string;

  /**
   * Zone's starting storage
   */
  abstract initialCap: number;

  /**
   * Used to help compute rate of change shown to user
   */
  private changeSinceLastTick: null | number = 0;

  /**
   * Unlock conditions
   */
  transientUnlockCheck = () => this.quantity > 0;
  observableUnlockCheck = () => true;

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
   * Estimate production per second
   */
  @computed
  get productionSummary(): ProductionConsumptionDisplay[] {
    const productionSummary: ProductionConsumptionDisplay[] = [];
    [...this.zoneJobs.asArray, ...this.zoneBuildings.asArray].forEach(
      (producer) => {
        const production = producer.proratedProductionPerSecond.find(
          ({ resource }) => resource === this.name,
        );
        if (producer.unlocked && production) {
          productionSummary.push({
            producerConsumerDisplayName: producer.displayName,
            producerConsumerQuantity: producer.numberActive,
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
        const production = producer.proratedConsumptionPerSecond.find(
          ({ resource }) => resource === this.name,
        );
        if (production && producer.unlocked) {
          consumptionSummary.push({
            producerConsumerDisplayName: producer.displayName,
            producerConsumerQuantity: producer.numberActive,
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
      if (storage && building.unlocked) {
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
   * Is the resource row expanded?
   */
  @computed
  get isExpanded(): boolean {
    return getGui(this).expandedResourceRow === this.name;
  }

  /**
   * Participates in tick system
   */
  @modelAction
  tick(delta: number): void {
    // track changes to this resource
    // zero is different from null!
    this.estimatedRate = null;
    if (this.changeSinceLastTick !== null) {
      if (delta > 0) this.estimatedRate = this.changeSinceLastTick / delta;
    }
    this.changeSinceLastTick = null;

    // Ensure resources are in storage bounds
    if (this.quantity > this.currentCap) this.quantity = this.currentCap;
    else if (this.quantity < 0) this.quantity = 0;
  }

  /**
   * Increases quantity. Optionally can turn off tracking for average rate
   */
  @modelAction
  increase(quantity: number, options?: { untracked?: boolean }): void {
    if (Number.isNaN(quantity))
      throw new Error(
        `increase function for resource ${this.name} got quantity NaN`,
      );
    if (quantity === 0) return;

    // track consumption
    if (!options?.untracked) {
      this.changeSinceLastTick =
        this.changeSinceLastTick !== null
          ? this.changeSinceLastTick + quantity
          : quantity;
    }

    // actually do mutation
    this.quantity += quantity;
  }

  /**
   * Decreases quantity. Optionally can turn off tracking for average rate
   */
  @modelAction
  decrease(quantity: number, options?: { untracked?: boolean }): void {
    if (Number.isNaN(quantity))
      throw new Error(
        `decrease function for resource ${this.name} got quantity NaN`,
      );
    if (quantity === 0) return;

    // track consumption
    if (!options?.untracked) {
      this.changeSinceLastTick =
        this.changeSinceLastTick !== null
          ? this.changeSinceLastTick - quantity
          : -quantity;
    }

    // actually do mutation
    this.quantity -= quantity;
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
   * Expand this resource row
   */
  @modelAction
  expandResource() {
    getGui(this).setExpandedResourceRow(this.name);
  }
}
