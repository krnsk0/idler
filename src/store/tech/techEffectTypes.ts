import { ActionNames } from '../zone/actions/actionNames';
import { ProducerNames } from '../zone/producers/producerNames';

export enum TechEffectNames {
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

export type TechEffect = ActionUnlockEffect;
