import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.AGRONOMIST)
export class Agronomist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.AGRONOMIST;
  displayName = 'agronomists';
  description = 'increases nutrient output of farms';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
  productionModifiers = [
    {
      building: BuildingNames.FARM,
      resource: ResourceNames.NUTRIENTS,
      percentageModifier: 0.2,
    },
  ];
}
