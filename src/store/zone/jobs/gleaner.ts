import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.GLEANER)
export class Gleaner extends ExtendedModel(BaseJob, {}) {
  name = JobNames.GLEANER;
  displayName = 'gleaners';
  description = 'collects unharvested waste biomass';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
  modifiers = [
    {
      type: 'output_base' as const,
      target: BuildingNames.FARM,
      resource: ResourceNames.BIOMASS,
      baseChange: 0.02,
    },
  ];
}
