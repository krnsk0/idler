import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.DYNAMO)
export class Dynamo extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.DYNAMO;
  displayName = 'dynamo';
  description =
    'generate electrical potential from exothermic, self-perpetuating reaction';
  splashText = 'from biomass, power';
  baseCost = [
    {
      resource: ResourceNames.ALLOY,
      quantity: 5,
    },
  ];
  costExponent = 1.45;
  inputs = [{ resource: ResourceNames.BIOMASS, quantityPerSecond: 1 }];
  outputs = [];
  storage = [];
  transientUnlockCheck = () => true;
  canSomeBeTurnedOff = true;
}
