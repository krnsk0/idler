import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { computed } from 'mobx';
import { getPower } from '../power/power';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';
import { getGui } from '../../gui/gui';

@model(ActionNames.COMPUTE)
export class Compute extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.COMPUTE;
  displayName = 'compute';
  description = 'consult the databanks';

  @computed
  get duration() {
    return 1;
  }
  inputs = [];
  outputs = [];
  basePowerProduction = 0;
  basePowerConsumption = 0;
  unlockWhen = () => {
    return getPower(this).production > 0;
  };

  @modelAction
  start(): void {
    getGui(this).openTechModal();
  }
}
