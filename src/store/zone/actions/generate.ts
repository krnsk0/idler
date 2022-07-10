import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { getResources } from '../resources/resources';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.GENERATE)
export class Generate extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.GENERATE;
  displayName = 'run generator';
  description =
    'generate electrical potential from exothermic, self-perpetuating reaction';
  duration = 5;
  inputs = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 5,
    },
  ];
  outputs = [];
  basePowerProduction = 1;
  basePowerConsumption = 0;
  unlockWhen = () => {
    return getResources(this)[ResourceNames.BIOMASS].quantity >= 5;
  };
}
