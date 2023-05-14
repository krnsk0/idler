import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.PHASE_MASS)
export class PhaseMass extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.PHASE_MASS;
  displayName = 'phase mass';
  initialCap = 10;
}
