import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.GEOLOGIST)
export class Geologist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.GEOLOGIST;
  displayName = 'geologist';
  description = 'increases ore output of mines';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
  productionModifiers = [
    {
      buildingName: BuildingNames.MINE,
      resourceName: ResourceNames.ALLOY,
      percentageModifier: 0.1,
    },
  ];
}
