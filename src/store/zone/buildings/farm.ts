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
  costExponent = 1.35;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.NUTRIENTS,
      quantityPerSecond: 0.05,
    },
    {
      resource: ResourceNames.BIOMASS,
      quantityPerSecond: 0.06,
    },
  ];
  storage = [];
  transientUnlockCheck = () => true;
  canSomeBeTurnedOff = false;
  powerOutputPerSecond = 0;
}
