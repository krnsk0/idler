import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.HABITAT)
export class Habitat extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.HABITAT;
  displayName = 'habitat';
  description = 'provides housing';
  baseCost = [
    {
      resource: ResourceNames.NUTRIENTS,
      quantity: 5,
    },
  ];
  costExponent = 1.2;
  inputs = [];
  outputs = [];
  storage = {};
}
