import { ExtendedModel, modelAction, tProp, types } from 'mobx-keystone';
import { ResourceNames } from './resources/resourceNames';
import { ZoneEntity } from './zoneEntity';
import { computed } from 'mobx';
import { getResources } from './resources/resources';

interface Consumption {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface Production {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface ProductionConsumptionDisplay {
  resourceDisplayName: string;
  quantityPerSecond: number;
}

export type ProductionMultipliers = {
  [key in ResourceNames]?: number;
};

export abstract class ProducerConsumer extends ExtendedModel(ZoneEntity, {
  quantity: tProp(types.number, 0),
  numberDisabled: tProp(types.number, 0),
}) {
  /**
   * Things consumed by this producerConsumer
   */
  abstract outputs: Consumption[];

  /**
   * Things produced by this producerConsumer
   */
  abstract inputs: Production[];

  /**
   * Is it possible for only some of this producer to be active?
   * E.g. "4 of 5 furnaces are enabled"
   */
  abstract canSomeBeTurnedOff: boolean;

  @computed
  get numberActive(): number {
    return this.quantity - this.numberDisabled;
  }

  /**
   * Intended to be overridden by children
   */
  @computed
  get productionModifiers(): ProductionMultipliers {
    return {};
  }

  /**
   * Per-second consumption of all at full capacity including quantity
   */
  @computed
  get consumptionPerSecond(): Production[] {
    return this.inputs.map(({ resource, quantityPerSecond }) => {
      return {
        resource,
        quantityPerSecond: this.numberActive * quantityPerSecond,
      };
    });
  }

  /**
   * Per-second production of all at full capacity including quantity
   */
  @computed
  get productionPerSecond(): Production[] {
    return this.outputs.map(({ resource, quantityPerSecond }) => {
      let productionMultiplier = 1;
      if (this.productionModifiers[resource] !== undefined) {
        productionMultiplier *= this.productionModifiers[resource] as number;
      }

      return {
        resource,
        quantityPerSecond:
          quantityPerSecond * this.numberActive * productionMultiplier,
      };
    });
  }

  /**
   * Effects with displayable names
   */
  @computed
  get displayEffects(): ProductionConsumptionDisplay[] {
    return [
      ...this.inputs.map(({ resource, quantityPerSecond }) => {
        return {
          resourceDisplayName: this.zoneResources[resource].displayName,
          quantityPerSecond: -quantityPerSecond,
        };
      }),
      ...this.outputs.map(({ resource, quantityPerSecond }) => {
        return {
          resourceDisplayName: this.zoneResources[resource].displayName,
          quantityPerSecond,
        };
      }),
    ];
  }

  /**
   * Allows disabling a producer
   */
  @modelAction
  disableEntity(): void {
    if (this.numberDisabled < this.quantity) {
      this.numberDisabled += 1;
    }
  }

  /**
   * Allows disabling a producer
   */
  @modelAction
  enableEntity(): void {
    if (this.numberDisabled > 0) {
      this.numberDisabled -= 1;
    }
  }

  /**
   * Runs production
   *
   * TODO: handle room for output
   */
  @modelAction
  runProduction(delta: number): void {
    // zero deltas cause NaNs
    if (delta === 0) return;

    // prorate limits production based on available input
    // and storage space for output

    let prorate = 1;

    // here we constrain the prorate based on available inputs
    this.consumptionPerSecond.forEach((input) => {
      const resourceName = input.resource;
      const potentialConsumption = input.quantityPerSecond * delta;
      if (potentialConsumption === 0) return;
      const thisProrate =
        getResources(this)[resourceName].quantity / potentialConsumption;
      prorate = Math.min(thisProrate, prorate);
    });

    // here we constrain the prorate based on available space for outputs
    // we do this only if there's something to consume; e.g. we always
    // "overproduce" if there's no consumers. in future this behavior could be
    // configurable per producer or even per resource.
    if (this.consumptionPerSecond.length) {
      this.productionPerSecond.forEach((product) => {
        const resourceName = product.resource;
        const potentialProduction = product.quantityPerSecond * delta;
        if (potentialProduction === 0) return;
        const resourceModel = this.zoneResources[resourceName];
        const availableSpace =
          resourceModel.currentCap - resourceModel.quantity;
        const thisProrate = availableSpace / potentialProduction;
        prorate = Math.min(thisProrate, prorate);
      });
    }

    // perform consumption
    this.consumptionPerSecond.forEach((input) => {
      const potentialConsumption = input.quantityPerSecond * delta * prorate;
      const resourceModel = this.zoneResources[input.resource];
      resourceModel.decrease(potentialConsumption);
    });

    // perform production
    this.productionPerSecond.forEach((product) => {
      const potentialProduction = product.quantityPerSecond * delta * prorate;
      const resourceModel = this.zoneResources[product.resource];
      resourceModel.increase(potentialProduction);
    });
  }
}
