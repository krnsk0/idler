import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.HARVEST)
export class Harvest extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.HARVEST;
  displayName = 'collect biomass';
  description = 'harvest arboraceous xenoflora';
  duration = 1;
  reverseProgressBar = false;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 1,
    },
  ];
  basePowerProduction = 0;
  basePowerConsumption = 0;
  unlockWhen = () => this.isUnlockedByTech;
}
