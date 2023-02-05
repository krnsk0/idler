import { model, ExtendedModel } from 'mobx-keystone';
import { getTech } from '../../tech/tech';
import { TechNames } from '../../tech/techNames';
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
      quantity: 8,
    },
  ];
  costExponent = 1.5;
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
}
