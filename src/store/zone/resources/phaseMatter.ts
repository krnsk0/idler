import { model, ExtendedModel } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.PHASE_MATTER)
export class PhaseMatter extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.PHASE_MATTER;
  displayName = 'phase matter';
  initialCap = 10;
}
