import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.MINE)
export class Mine extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.MINE;
  displayName = 'mine';
  description = 'extract subsurface mineral deposits';
  baseCost = [
    {
      resource: ResourceNames.LUMBER,
      quantity: 15,
    },
    {
      resource: ResourceNames.ALLOY,
      quantity: 10,
    },
  ];
  costExponent = 1.55;
  inputs = [];
  outputs = [
    { resource: ResourceNames.ORE, quantityPerSecond: 0.2 },
    { resource: ResourceNames.ROCK, quantityPerSecond: 0.3 },
  ];
  storage = [];
  transientUnlockCheck = () => true;
  canSomeBeTurnedOff = true;
  powerOutputPerSecond = 0;
  powerNeededPerSecond = 1;
}
