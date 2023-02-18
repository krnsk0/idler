import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.TREE_FARM)
export class TreeFarm extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.TREE_FARM;
  displayName = 'tree farm';
  description = 'sustainably cultivate arboraceous xenoflora';
  baseCost = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 5,
    },
    {
      resource: ResourceNames.ROCK,
      quantity: 4,
    },
  ];
  costExponent = 1.5;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.LUMBER,
      quantityPerSecond: 0.1,
    },
  ];
  storage = [];
  transientUnlockCheck = () => true;
  canSomeBeTurnedOff = false;
  powerOutputPerSecond = 0;
  powerNeededPerSecond = 0;
}
