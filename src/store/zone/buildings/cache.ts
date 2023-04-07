import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.CACHE)
export class Cache extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.CACHE;
  displayName = 'cache';
  description = 'a structure for stockpiling resources';
  baseCost = [
    {
      resource: ResourceNames.LUMBER,
      quantity: 10,
    },
    {
      resource: ResourceNames.ROCK,
      quantity: 8,
    },
    {
      resource: ResourceNames.ALLOY,
      quantity: 4,
    },
  ];
  costExponent = 1.6;
  inputs = [];
  outputs = [];
  storage = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 10,
    },
    {
      resource: ResourceNames.LUMBER,
      quantity: 10,
    },
    {
      resource: ResourceNames.ROCK,
      quantity: 5,
    },
    {
      resource: ResourceNames.ORE,
      quantity: 5,
    },
    {
      resource: ResourceNames.ALLOY,
      quantity: 5,
    },
  ];
  transientUnlockCheck = () => true;
  canSomeBeTurnedOff = false;
  powerOutputPerSecond = 0;
  powerNeededPerSecond = 0;
}
