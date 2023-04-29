import { model, ExtendedModel } from 'mobx-keystone';
import { BaseEnemy } from './baseEnemy';
import { EnemyNames } from './enemyNames';

@model(EnemyNames.PHASE_MANTIS)
export class PhaseMantis extends ExtendedModel(BaseEnemy, {}) {
  name = EnemyNames.PHASE_MANTIS;
  displayName = 'phase mantis';
  description =
    'mature insectoid organism. can induce destabilizing resonance from some distance.';
  baseHitPoints = 30;
  baseAttackCooldown = 10;
  baseAttackDamage = 2;
  baseAttackRange = 50;
  baseMovementSpeed = 1.5;
}
