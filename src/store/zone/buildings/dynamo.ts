import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.DYNAMO)
export class Dynamo extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.DYNAMO;
  displayName = 'dynamo';
  description =
    'generate electrical potential from exothermic, self-perpetuating reaction';
  baseCost = [
    {
      resource: ResourceNames.ALLOY,
      quantity: 6,
    },
  ];
  costExponent = 1.5;
  inputs = [{ resource: ResourceNames.BIOMASS, quantityPerSecond: 1 }];
  outputs = [];
  storage = [];
  transientUnlockCheck = () => true;
  canSomeBeTurnedOff = true;
  powerOutputPerSecond = 1;
  powerNeededPerSecond = 0;

  /**
   * This is an override!
   */
  @modelAction
  buy(quantity: number): void {
    super.buy(quantity);
  }
}
