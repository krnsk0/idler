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
  abstract outputs: Consumption[];
  abstract inputs: Production[];
  abstract canSomeBeTurnedOff: boolean;

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
        quantityPerSecond: quantityPerSecond * this.quantity,
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
          quantityPerSecond * this.quantity * productionMultiplier,
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
   * Runs production
   *
   * TODO: handle room for output
   */
  @modelAction
  runProduction(delta: number): void {
    // zero deltas cause NaNs
    if (delta === 0) return;

    // calculate prorate
    let prorate = 1;
    this.consumptionPerSecond.forEach((input) => {
      const resourceName = input.resource;
      const potentialConsumption = input.quantityPerSecond * delta;
      if (potentialConsumption === 0) return;

      const thisProrate =
        getResources(this)[resourceName].quantity / potentialConsumption;
      prorate = Math.min(thisProrate, prorate);
    });

    // do consumption
    this.consumptionPerSecond.forEach((input) => {
      const potentialConsumption = input.quantityPerSecond * delta * prorate;
      const resourceModel = this.zoneResources[input.resource];

      resourceModel.decrease(potentialConsumption);
    });

    // do production
    this.productionPerSecond.forEach((product) => {
      const potentialProduction = product.quantityPerSecond * delta * prorate;
      const resourceModel = this.zoneResources[product.resource];
      resourceModel.increase(potentialProduction);
    });
  }
}
