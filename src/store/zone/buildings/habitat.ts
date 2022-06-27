import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.Habitat)
export class Habitat extends ExtendedModel(BaseBuilding, {}) {
  buildingName = BuildingNames.Habitat;
  displayName = 'Habitat';
  baseCost = [
    {
      resource: ResourceNames.Nutrients,
      quantity: 5,
    },
  ];
  costExponent = 1.2;
  inputs = [];
  outputs = [];
  storage = {};
}
