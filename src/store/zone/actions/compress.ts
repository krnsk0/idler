import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.COMPRESS)
export class Compress extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.COMPRESS;
  displayName = 'compress biomass';
  description = 'a ligneous substance';
  duration = 5;
  inputs = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 5,
    },
  ];
  outputs = [
    {
      resource: ResourceNames.LUMBER,
      quantity: 1,
    },
  ];
}