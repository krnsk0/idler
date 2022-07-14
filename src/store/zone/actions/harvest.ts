import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.HARVEST)
export class Harvest extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.HARVEST;
  displayName = 'harvest biomass';
  description = 'collect arboraceous xenoflora';
  duration = 1;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 1,
    },
  ];
  basePowerProduction = 0;
  basePowerConsumption = 0;
  unlockWhen = () => true;
}
