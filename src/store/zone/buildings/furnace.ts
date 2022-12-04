import { model, ExtendedModel } from 'mobx-keystone';

import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.FURNACE)
export class Furnace extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.FURNACE;
  displayName = 'furnace';
  description =
    'uses endothermic reduction to extract a malleable alloy from the ore ';
  splashText = 'from ore, alloy';
  baseCost = [
    {
      resource: ResourceNames.LUMBER,
      quantity: 6,
    },
    {
      resource: ResourceNames.ROCK,
      quantity: 10,
    },
  ];
  costExponent = 1.5;
  inputs = [{ resource: ResourceNames.ORE, quantityPerSecond: 0.1 }];
  outputs = [{ resource: ResourceNames.ALLOY, quantityPerSecond: 0.1 }];
  storage = [];
  transientUnlockCheck = () => true;
}
