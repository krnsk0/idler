import { model, ExtendedModel } from 'mobx-keystone';
import { BaseJob } from './baseJob';
import { JobNames } from './jobNames';

@model(JobNames.ARBORIST)
export class Arborist extends ExtendedModel(BaseJob, {}) {
  name = JobNames.ARBORIST;
  displayName = 'arborist';
  description = 'increases tree farm output; speaks for the trees';
  inputs = [];
  outputs = [];
  transientUnlockCheck = () => true;
}
