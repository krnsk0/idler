import { ActionNames } from '../zone/actions/actionNames';
import { JobNames } from '../zone/jobs/jobNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { ResourceNames } from '../zone/resources/resourceNames';

export enum TechEffectNames {
  RESOURCE_UNLOCK = 'RESOURCE_UNLOCK',
  BUILDING_UNLOCK = 'BUILDING_UNLOCK',
  ACTION_UNLOCK = 'ACTION_UNLOCK',
  JOB_UNLOCK = 'JOB_UNLOCK',
  BUILDING_PRODUCTION_MODIFIER = 'BUILDING_PRODUCTION_MODIFIER',
}

export interface BuildingUnlockEffect {
  kind: TechEffectNames.BUILDING_UNLOCK;
  buildingName: BuildingNames;
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

export interface BuildingProductionModifier {
  kind: TechEffectNames.BUILDING_PRODUCTION_MODIFIER;
  buildingName: BuildingNames;
  resourceName: ResourceNames;
  multiplier: number;
}

export type TechEffect =
  | ActionUnlockEffect
  | BuildingUnlockEffect
  | ResourceUnlockEffect
  | JobUnlockEffect
  | BuildingProductionModifier;
