import { model, ExtendedModel, modelAction, tProp, types } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.COMBUST)
export class Combust extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.COMBUST;
  displayName = 'refuel generator';
  description =
    'generate electrical potential from exothermic, self-perpetuating reaction';
  duration = 2;
  inputs = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 1,
    },
  ];
  outputs = [];
}
