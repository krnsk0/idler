import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { getResources } from '../resources/resources';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.HARVEST)
export class Harvest extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.HARVEST;
  displayName = 'harvest biomass';
  description = 'gather organic material';
  duration = 2;

  @modelAction
  onActionComplete() {
    getResources(this)[ResourceNames.BIOMASS].increase(1, { untracked: true });
  }
}
