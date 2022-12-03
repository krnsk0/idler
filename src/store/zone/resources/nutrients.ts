import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource, ProductionConsumptionDisplay } from './baseResource';
import { ResourceNames } from './resourceNames';
import { override, computed } from 'mobx';

@model(ResourceNames.NUTRIENTS)
export class Nutrients extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.NUTRIENTS;
  displayName = 'nutrients';
  initialCap = 5;
  unlockWhen = () => this.quantity > 0;

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
