import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.HABITAT)
export class Habitat extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.HABITAT;
  displayName = 'habitat';
  description = 'protection from the elements for one colonist';
  baseCost = [
    {
      resource: ResourceNames.LUMBER,
      quantity: 6,
    },
  ];
  costExponent = 1.2;
  inputs = [];
  outputs = [];
  storage = [
    {
      resource: ResourceNames.COLONISTS,
      quantity: 1,
    },
  ];
  transientUnlockCheck = () => true;
  canSomeBeTurnedOff = false;
  powerOutputPerSecond = 0;
  powerNeededPerSecond = 0;
}
