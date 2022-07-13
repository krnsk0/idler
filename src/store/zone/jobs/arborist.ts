import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.ARBORIST)
export class Arborist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.ARBORIST;
  displayName = 'habitat';
  description = 'housing for 2 colonists';
  splashText = 'protection from the elements';
  inputs = [];
  outputs = [];
  unlockWhen = () => this.isUnlockedByTech;
}
