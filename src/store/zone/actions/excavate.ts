import { model, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.EXCAVATE)
export class Excavate extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.EXCAVATE;
  displayName = 'excavate';
  description =
    'delve for a lithoid substance and small quantities of metalliferous ore';
  duration = 5;
  reverseProgressBar = false;
  inputs = [];
  outputs = [
    { resource: ResourceNames.ROCK, quantity: 2 },
    { resource: ResourceNames.ORE, quantity: 1 },
  ];
  basePowerProduction = 0;
  basePowerConsumption = 1;
  transientUnlockCheck = () => true;
}
