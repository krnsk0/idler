import { model, ExtendedModel } from 'mobx-keystone';
import { BaseEnemy } from './baseEnemy';
import { EnemyNames } from './enemyNames';

@model(EnemyNames.PHASE_MANTIS)
export class PhaseMantis extends ExtendedModel(BaseEnemy, {}) {
  name = EnemyNames.PHASE_MANTIS;
  displayName = 'phase mantis';
  description =
    'mature insectoid organism. can induce destabilizing resonance from greater distance.';
  baseHitPoints = 12;
  baseAttackCooldown = 5;
  baseAttackDamage = 3;
  baseAttackRange = 20;
  baseMovementSpeed = 1.5;
}
