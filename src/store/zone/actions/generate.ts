import { model, ExtendedModel } from 'mobx-keystone';
import { override } from 'mobx';
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
  duration = 4;
  reverseProgressBar = true;
  inputs = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 4,
    },
  ];
  outputs = [];
  basePowerProduction = 1;
  basePowerConsumption = 0;
  transientUnlockCheck = () => !!getTech(this).selectedTech;

  @override
  get observableUnlockCheck(): boolean {
    return true;
  }
}
