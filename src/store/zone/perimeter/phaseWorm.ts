import { model, ExtendedModel } from 'mobx-keystone';
import { BaseEnemy } from './baseEnemy';
import { EnemyNames } from './enemyNames';

@model(EnemyNames.PHASE_WORM)
export class PhaseWorm extends ExtendedModel(BaseEnemy, {}) {
  name = EnemyNames.PHASE_WORM;
  displayName = 'phase worm';
  description =
    'small vermiform organism. can induce destabilizing resonance in structures and equipment.';
  baseHitPoints = 10;
  baseAttackCooldown = 10;
  baseAttackDamage = 1;
  baseAttackRange = 10;
  baseMovementSpeed = 1;
}
