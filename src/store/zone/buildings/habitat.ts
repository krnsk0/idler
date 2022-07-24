import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.HABITAT)
export class Habitat extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.HABITAT;
  displayName = 'habitat';
  description = 'housing for 2 colonists';
  splashText = 'protection from the elements';
  baseCost = [
    {
      resource: ResourceNames.LUMBER,
      quantity: 5,
    },
  ];
  costExponent = 1.4;
  inputs = [];
  outputs = [];
  storage = [
    {
      resource: ResourceNames.COLONISTS,
      quantity: 2,
    },
  ];
  unlockWhen = () => this.isUnlockedByTech;
}
