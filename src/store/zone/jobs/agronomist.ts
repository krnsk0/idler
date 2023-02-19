import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.AGRONOMIST)
export class Agronomist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.AGRONOMIST;
  displayName = 'agronomist';
  description = 'increases nutrient output of farms';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
  productionModifiers = [
    {
      buildingName: BuildingNames.FARM,
      resourceName: ResourceNames.NUTRIENTS,
      percentageModifier: 0.2,
    },
  ];
}
