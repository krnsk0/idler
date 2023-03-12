import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.AGRONOMIST)
export class Agronomist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.AGRONOMIST;
  displayName = 'agronomists';
  description = 'increase food output of farms';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
  modifiers = [
    {
      type: 'output_percent' as const,
      target: BuildingNames.FARM,
      resource: ResourceNames.FOOD,
      percentChange: 0.2,
    },
  ];
}
