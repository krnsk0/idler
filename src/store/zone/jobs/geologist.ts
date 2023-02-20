import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.GEOLOGIST)
export class Geologist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.GEOLOGIST;
  displayName = 'geologists';
  description = 'increases ore output of mines';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
  modifiers = [
    {
      type: 'output_percent' as const,
      target: BuildingNames.MINE,
      resource: ResourceNames.ORE,
      percentChange: 0.1,
    },
  ];
}
