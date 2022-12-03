import { ExtendedModel, modelAction, tProp, types } from 'mobx-keystone';
import { ResourceNames } from './resources/resourceNames';
import { ZoneEntity } from './zoneEntity';
import { computed } from 'mobx';
import { BaseBuilding } from './buildings/baseBuilding';
import { getTech } from '../tech/tech';
import { BuildingNames } from './buildings/buildingNames';
import { BuildingProductionModifier } from '../tech/techEffectTypes';

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
  abstract outputs: Consumption[];
  abstract inputs: Production[];

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
    /**
     * Get any production mofidiers we need to apply
     */
    const productionModifiers: Array<BuildingProductionModifier> = [];
    if (this instanceof BaseBuilding) {
      const buildingModifiers =
        getTech(this).allBuildingModifiers[this.$modelType as BuildingNames];
      if (buildingModifiers) productionModifiers.push(...buildingModifiers);
    }

    /**
     * Iterate products
     */
    return this.outputs.map(({ resource, quantityPerSecond }) => {
      /**
       * Is this product modified?
       */
      let productModifier = 1;
      productionModifiers.forEach((modifier) => {
        if (modifier.resourceName === resource) {
          productModifier *= modifier.multiplier;
        }
      });

      return {
        resource,
        quantityPerSecond: quantityPerSecond * this.quantity * productModifier,
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
   * TODO: only run when we have enough inputs
   * TODO: stop production when hitting maximums
   */
  @modelAction
  runProduction(delta: number): void {
    this.productionPerSecond.forEach((product) => {
      const potentialProduction = product.quantityPerSecond * delta;
      const resourceModel = this.zoneResources[product.resource];
      resourceModel.increase(potentialProduction);
    });
  }
}
