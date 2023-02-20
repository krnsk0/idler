import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ModifierTypes } from '../modifiers';
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
      modifierType: ModifierTypes.PRODUCTION,
      target: BuildingNames.MINE,
      resource: ResourceNames.ORE,
      modifier: {
        percentChange: 0.1,
      },
    },
  ];
}
