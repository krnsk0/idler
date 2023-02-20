import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource, ProductionConsumptionDisplay } from './baseResource';
import { ResourceNames } from './resourceNames';
import { override } from 'mobx';

@model(ResourceNames.FOOD)
export class Food extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.FOOD;
  displayName = 'food';
  initialCap = 50;

  /**
   * Estimate production per second
   */
  @override
  get consumptionSummary(): ProductionConsumptionDisplay[] {
    const consumptionSummary = super.consumptionSummary;
    const consumption = this.zoneJobs.foodConsumption;
    const colonists = this.zoneResources[ResourceNames.COLONISTS].quantity;
    const displayName = this.zoneResources[ResourceNames.COLONISTS].displayName;

    if (colonists > 0)
      return [
        ...consumptionSummary,
        {
          producerConsumerDisplayName: displayName,
          producerConsumerQuantity: colonists,
          resourceQuantityPerSecond: consumption,
        },
      ];
    else return consumptionSummary;
  }
}
