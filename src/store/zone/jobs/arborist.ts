import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.ARBORIST)
export class Arborist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.ARBORIST;
  displayName = 'arborist';
  description = 'cultivates trees & harvests lumber';
  splashText = "it's time to branch out";
  inputs = [];
  outputs = [];
  unlockWhen = () => this.isUnlockedByTech;
}
