import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.BIOMASS)
export class Biomass extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.BIOMASS;
  displayName = 'biomass';
  initialCap = 20;
  unlockWhen = {
    observable: () => {
      return true;
    },
    transient: () => {
      return this.quantity > 0;
    },
  };
}
