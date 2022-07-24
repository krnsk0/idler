import { ExtendedModel, modelAction, tProp, types } from 'mobx-keystone';
import { ResourceNames } from './resources/resourceNames';
import { ZoneEntity } from './zoneEntity';
import { computed } from 'mobx';

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

export abstract class ProducerConsumer extends ExtendedModel(ZoneEntity, {
  quantity: tProp(types.number, 0),
}) {
  abstract outputs: Array<Consumption>;
  abstract inputs: Array<Production>;

  /**
   * Per-second production of all at full capacity
   */
  @computed
  get productionPerSecond(): Array<Production> {
    return this.outputs.map(({ resource, quantityPerSecond }) => {
      return {
        resource,
        quantityPerSecond: quantityPerSecond * this.quantity,
      };
    });
  }

  /**
   * Effects with displayable names
   */
  @computed
  get displayEffects(): Array<ProductionConsumptionDisplay> {
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
   * TODO: only run when we have enough inputs
   * TODO: stop production when hitting maximums
   */
  @modelAction
  runProduction(delta: number): void {
    this.productionPerSecond.forEach((product) => {
      const potentialProduction =
        product.quantityPerSecond * this.quantity * delta;
      const resourceModel = this.zoneResources[product.resource];
      resourceModel.increase(potentialProduction);
    });
  }
}
