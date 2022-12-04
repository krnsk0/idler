import { model, ExtendedModel } from 'mobx-keystone';
import { getTech } from '../../tech/tech';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.GENERATE)
export class Generate extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.GENERATE;
  displayName = 'run generator';
  description =
    'generate electrical potential from exothermic, self-perpetuating reaction';
  duration = 5;
  reverseProgressBar = true;
  inputs = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 5,
    },
  ];
  outputs = [];
  basePowerProduction = 1;
  basePowerConsumption = 0;
  transientUnlockCheck = () => !!getTech(this).selectedTech;
  observableUnlockCheck = () => true;
}
