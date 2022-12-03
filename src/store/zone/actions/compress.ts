import { model, ExtendedModel } from 'mobx-keystone';
import { getTech } from '../../tech/tech';
import { TechNames } from '../../tech/techNames';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { BaseAction } from './baseAction';

@model(ActionNames.COMPRESS)
export class Compress extends ExtendedModel(BaseAction, {}) {
  name = ActionNames.COMPRESS;
  displayName = 'compress biomass';
  description = 'subject biomass to heat and pressure';
  duration = 2.5;
  reverseProgressBar = false;
  inputs = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 5,
    },
  ];
  outputs = [
    {
      resource: ResourceNames.LUMBER,
      quantity: 2,
    },
  ];
  basePowerProduction = 0;
  basePowerConsumption = 1;
  unlockWhen = {
    observable: () => {
      return getTech(this)[TechNames.BIOMASS_COMPRESSION].researched;
    },
    transient: () => {
      return true;
    },
  };
}
