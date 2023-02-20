import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ModifierTypes } from '../modifiers';
import { ResourceNames } from '../resources/resourceNames';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.ARBORIST)
export class Arborist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.ARBORIST;
  displayName = 'arborists';
  description = 'increases tree farm output; speaks for the trees';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
  modifiers = [
    {
      modifierType: ModifierTypes.OUTPUT,
      target: BuildingNames.TREE_FARM,
      resource: ResourceNames.LUMBER,
      modifier: {
        percentChange: 0.1,
      },
    },
  ];
}
