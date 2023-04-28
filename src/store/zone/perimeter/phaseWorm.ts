import { model, ExtendedModel } from 'mobx-keystone';
import { BaseEnemy } from './baseEnemy';
import { EnemyNames } from './enemyNames';

@model(EnemyNames.PHASE_WORM)
export class PhaseWorm extends ExtendedModel(BaseEnemy, {}) {
  name = EnemyNames.PHASE_WORM;
  displayName = 'phase worm';
  baseHitPoints = 10;
  description = 'seemingly intangible vermiform organism';
}
