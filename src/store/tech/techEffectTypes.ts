import { ActionNames } from '../zone/actions/actionNames';
import { ProducerNames } from '../zone/producers/producerNames';
import { ResourceNames } from '../zone/resources/resourceNames';

export enum TechEffectNames {
  RESOURCE_UNLOCK = 'RESOURCE_UNLOCK',
  PRODUCER_UNLOCK = 'PRODUCER_UNLOCK',
  ACTION_UNLOCK = 'ACTION_UNLOCK',
}

export interface ProducerUnlockEffect {
  kind: TechEffectNames.PRODUCER_UNLOCK;
  producerName: ProducerNames;
}
export interface ActionUnlockEffect {
  kind: TechEffectNames.ACTION_UNLOCK;
  actionName: ActionNames;
}

export interface ResourceUnlockEffect {
  kind: TechEffectNames.RESOURCE_UNLOCK;
  resourceName: ResourceNames;
}

export type TechEffect =
  | ActionUnlockEffect
  | ProducerUnlockEffect
  | ResourceUnlockEffect;
