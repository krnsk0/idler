import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.CACHE)
export class Cache extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.CACHE;
  displayName = 'cache';
  description = '';
  splashText = 'protection from the elements';
  baseCost = [
    {
      resource: ResourceNames.LUMBER,
      quantity: 10,
    },
  ];
  costExponent = 1.45;
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
  ];
  transientUnlockCheck = () => true;
}
