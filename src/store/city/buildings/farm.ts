import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseProducer } from './baseProducer';
import { BuildingNames } from './buildingNames';

@model(BuildingNames.Farm)
export class Farm extends ExtendedModel(BaseProducer, {}) {
  displayName = 'Farm';
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.Nutrients,
      quantity: 0.01,
    },
  ];
}
