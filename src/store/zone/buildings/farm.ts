import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.FARM)
export class Farm extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.FARM;
  displayName = 'farm';
  description = 'a triumph of xenobotany';
  baseCost = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 4,
    },
    {
      resource: ResourceNames.LUMBER,
      quantity: 2,
    },
  ];
  costExponent = 1.5;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.NUTRIENTS,
      quantityPerSecond: 0.2,
    },
    {
      resource: ResourceNames.BIOMASS,
      quantityPerSecond: 0.2,
    },
  ];
  storage = [];
  transientUnlockCheck = () => true;
  canSomeBeTurnedOff = false;
  powerOutputPerSecond = 0;
  powerNeededPerSecond = 0;
}
