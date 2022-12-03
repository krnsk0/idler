import { model, ExtendedModel } from 'mobx-keystone';
import { getTech } from '../../tech/tech';
import { TechNames } from '../../tech/techNames';
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
  unlockWhen = () => {
    return getTech(this)[TechNames.AGROFORESTRY].researched;
  };
}
