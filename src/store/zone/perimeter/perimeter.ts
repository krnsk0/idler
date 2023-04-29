import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { getRadar } from '../../selectors';
import { PhaseWorm } from './phaseWorm';
import { PhaseMantis } from './phaseMantis';
import { waveBuilder } from './waveBuilder';
import { EnemyNames } from './enemyNames';

function exhaustiveGuard(value: never): never {
  throw new Error(
    `Reached guard function with unexpected value: ${JSON.stringify(
      value,
    )}. Is switch/case missing a value?`,
  );
}

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  enemies: tProp(
    types.array(types.or(types.model(PhaseWorm), types.model(PhaseMantis))),
    () => [],
  ),
}) {
  transientUnlockCheck = () => true;
  observableUnlockCheck = () => getRadar(this).unlocked;

  /**
   * Starts a new wave
   */
  @modelAction
  startWave(wave: number) {
    const threatLevel = Math.floor(wave * 1.5); // consider making exponential?
    const waveDescription = waveBuilder(threatLevel);
    console.log('waveDescription: ', { threatLevel, waveDescription });
    waveDescription.forEach((enemyName: EnemyNames) => {
      switch (enemyName) {
        case EnemyNames.PHASE_WORM:
          this.enemies.push(new PhaseWorm({}));
          break;
        case EnemyNames.PHASE_MANTIS:
          this.enemies.push(new PhaseMantis({}));
          break;
        default:
          // if this highlights it means we are missing a value in the
          // switch case above
          exhaustiveGuard(enemyName);
      }
    });
  }

  /**
   * The tick action for this model
   */
  @modelAction
  tick(delta: number) {
    this.enemies.forEach((enemy) => enemy.tick(delta));
  }
}
