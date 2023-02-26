import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.ARBORIST)
export class Arborist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.ARBORIST;
  displayName = 'arborists';
  description = 'increase tree farm output. speaks for the trees.';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
  modifiers = [
    {
      type: 'output_percent' as const,
      target: BuildingNames.TREE_FARM,
      resource: ResourceNames.LUMBER,
      percentChange: 0.1,
    },
  ];
}
