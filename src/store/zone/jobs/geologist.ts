import { model, ExtendedModel } from 'mobx-keystone';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.GEOLOGIST)
export class Geologist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.GEOLOGIST;
  displayName = 'geologist';
  description = 'increases mine output';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
}
