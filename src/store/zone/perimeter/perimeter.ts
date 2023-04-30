import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { getRadar } from '../../selectors';
import { PhaseWorm } from './phaseWorm';
import { PhaseMantis } from './phaseMantis';
import { waveBuilder } from './utils/waveBuilder';
import { statModifierFactory } from './utils/statModifierFactory';
import { EnemyNames } from './enemyNames';

function exhaustiveGuard(value: never): never {
  throw new Error(
    `Reached guard function with unexpected value: ${JSON.stringify(
      value,
    )}. Is switch/case missing a value?`,
  );
}

const STARTING_PERIMETER_HEALTH = 50;
@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  enemies: tProp(
    types.array(types.or(types.model(PhaseWorm), types.model(PhaseMantis))),
    () => [],
  ),
  perimeterHealth: tProp(types.number, () => STARTING_PERIMETER_HEALTH),
}) {
  transientUnlockCheck = () => true;
  observableUnlockCheck = () => getRadar(this).unlocked;

  /**
   * Max health of perimeter
   */
  @computed
  get maxPerimeterHealth() {
    return STARTING_PERIMETER_HEALTH;
  }

  /**
   * Perimeter health as a percentage
   */
  @computed
  get perimeterHealthPercent() {
    return this.perimeterHealth / this.maxPerimeterHealth;
  }

  /**
   * Starts a new wave
   */
  @modelAction
  startWave(wave: number) {
    const threatLevel = Math.floor(wave * 1.5); // consider making exponential?
    const waveDescription = waveBuilder(threatLevel);
    waveDescription.forEach((enemyName: EnemyNames) => {
      const modifiers = statModifierFactory();
      switch (enemyName) {
        case EnemyNames.PHASE_WORM:
          this.enemies.push(new PhaseWorm(modifiers));
          break;
        case EnemyNames.PHASE_MANTIS:
          this.enemies.push(new PhaseMantis(modifiers));
          break;
        default:
          // if this highlights it means we are missing a value in the
          // switch case above
          exhaustiveGuard(enemyName);
      }
    });
  }

  /**
   * Damage the perimeter
   */
  @modelAction
  damagePerimeter(damage: number) {
    this.perimeterHealth = Math.max(0, this.perimeterHealth - damage);
  }

  /**
   * The tick action for this model
   */
  @modelAction
  tick(delta: number) {
    this.enemies.forEach((enemy) => enemy.tick(delta));

    // TODO REMOVE THIS
    // if enemy array is over 10, limit it to 10 items
    if (this.enemies.length > 10) {
      this.enemies.splice(10);
    }
  }
}
