import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ModifierTypes } from '../modifiers';
import { ResourceNames } from '../resources/resourceNames';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.AGRONOMIST)
export class Agronomist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.AGRONOMIST;
  displayName = 'agronomists';
  description = 'increases food output of farms';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
  modifiers = [
    {
      modifierType: ModifierTypes.OUTPUT,
      target: BuildingNames.FARM,
      resource: ResourceNames.FOOD,
      modifier: {
        percentChange: 0.2,
      },
    },
  ];
}
