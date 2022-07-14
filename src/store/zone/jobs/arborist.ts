import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.ARBORIST)
export class Arborist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.ARBORIST;
  displayName = 'arborist';
  description = 'harvests and replants arboriform xenoflora';
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.LUMBER,
      quantityPerSecond: 0.1,
    },
  ];
  unlockWhen = () => this.isUnlockedByTech;
}