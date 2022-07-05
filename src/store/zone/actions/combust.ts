import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.COMBUST)
export class Combust extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.COMBUST;
  displayName = 'combust biomass';
  description = 'capture power from exothermic, self-perpetuating reaction';
  duration = 3;
  inputs = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 3,
    },
  ];
  outputs = [];
}
