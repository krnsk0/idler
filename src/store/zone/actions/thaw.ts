import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.THAW)
export class Thaw extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.THAW;
  displayName = 'thaw colonist';
  description = 'awaken a worker from suspended animation';
  duration = 10;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.COLONISTS,
      quantity: 1,
    },
  ];
  basePowerProduction = 0;
  basePowerConsumption = 0;
  unlockWhen = () => this.isUnlockedByTech;
}
