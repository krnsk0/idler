import { ActionNames } from '../zone/actions/actionNames';
import { JobNames } from '../zone/jobs/jobNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { ResourceNames } from '../zone/resources/resourceNames';

export enum TechEffectNames {
  RESOURCE_UNLOCK = 'RESOURCE_UNLOCK',
  PRODUCER_UNLOCK = 'PRODUCER_UNLOCK',
  ACTION_UNLOCK = 'ACTION_UNLOCK',
  JOB_UNLOCK = 'JOB_UNLOCK',
}

export interface ProducerUnlockEffect {
  kind: TechEffectNames.PRODUCER_UNLOCK;
  producerName: BuildingNames;
}
export interface ActionUnlockEffect {
  kind: TechEffectNames.ACTION_UNLOCK;
  actionName: ActionNames;
}

export interface ResourceUnlockEffect {
  kind: TechEffectNames.RESOURCE_UNLOCK;
  resourceName: ResourceNames;
}
export interface JobUnlockEffect {
  kind: TechEffectNames.JOB_UNLOCK;
  jobName: JobNames;
}

export type TechEffect =
  | ActionUnlockEffect
  | ProducerUnlockEffect
  | ResourceUnlockEffect
  | JobUnlockEffect;
