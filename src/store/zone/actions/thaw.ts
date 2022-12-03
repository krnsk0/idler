import { model, ExtendedModel } from 'mobx-keystone';
import { getTech } from '../../tech/tech';
import { TechNames } from '../../tech/techNames';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.THAW)
export class Thaw extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.THAW;
  displayName = 'thaw colonist';
  description =
    'awaken a worker from suspended animation. may starve if no food available';
  duration = 10;
  reverseProgressBar = false;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.COLONISTS,
      quantity: 1,
    },
  ];
  basePowerProduction = 0;
  basePowerConsumption = 1;
  unlockWhen = {
    observable: () => {
      return getTech(this)[TechNames.CRYONICS].researched;
    },
    transient: () => {
      return true;
    },
  };
}
