import { ExtendedModel, modelAction, tProp, types } from 'mobx-keystone';
import { ResourceNames } from './resources/resourceNames';
import { ZoneEntity } from './zoneEntity';
import { computed } from 'mobx';
import { getPower, getResources } from '../selectors';

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
  /**
   * How many does the player own?
   */
  quantity: tProp(types.number, 0),
  /**
   * Are any disabled?
   */
  numberDisabled: tProp(types.number, 0),
  /**
   * Did this generator (if it is a generator) have enough input last tick
   * to produce power this tick? If so, this is 1. Otherwise, less than 1.
   */
  powerProductionProrate: tProp(types.number, 0),
  /**
   * Did we prorate last tick? What % of total capacithy?
   */
  lastTickProrate: tProp(types.number, 0),
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
   * Power output per sec when active
   */
  abstract powerOutputPerSecond: number;

  /**
   * Power requires per sec when active
   */
  abstract powerNeededPerSecond: number;

  /**
   * Is it possible for only some of this producer to be active?
   * E.g. "4 of 5 furnaces are enabled"
   */
  abstract canSomeBeTurnedOff: boolean;

  /**
   * How many are active
   */
  @computed
  get numberActive(): number {
    return this.quantity - this.numberDisabled;
  }

  /**
   * Current power production
   */
  @computed
  get powerProduction(): number {
    return (
      this.powerOutputPerSecond *
      this.powerProductionProrate *
      this.numberActive
    );
  }

  /**
   * Current power production
   */
  @computed
  get powerConsumption(): number {
    return (
      this.powerNeededPerSecond *
      this.powerProductionProrate *
      this.numberActive
    );
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
   * Can more producers be enabled?
   */
  @computed
  get canEnableEntity(): boolean {
    return this.numberDisabled > 0;
  }

  /**
   * Can more producers be disabled?
   */
  @computed
  get canDisableEntity(): boolean {
    return this.numberDisabled < this.quantity;
  }

  /**
   * Technically, "was prorated last tick?""
   */
  @computed
  get isProrated(): boolean {
    return this.lastTickProrate < 1;
  }

  /**
   * Allows disabling a producer
   */
  @modelAction
  disableEntity(): void {
    if (this.canDisableEntity) {
      this.numberDisabled += 1;
    }
  }

  /**
   * Allows disabling a producer
   */
  @modelAction
  enableEntity(): void {
    if (this.canEnableEntity) {
      this.numberDisabled -= 1;
    }
  }

  /**
   * Runs production
   *
   * TODO: handle case where we lack room for output
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

    // store prorate to help with calculating power produced next tick
    // as power production intentionally lags behind by one tick
    this.powerProductionProrate = prorate;

    // calculate any prorate adjustments based on available power
    if (this.powerConsumption > 0) {
      prorate = Math.min(prorate, getPower(this).satisfaction);
    }

    // store prorate to refer to in future tick
    this.lastTickProrate = prorate;

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
