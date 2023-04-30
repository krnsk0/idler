import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { getRadar } from '../../selectors';
import { PhaseWorm } from './enemies/phaseWorm';
import { PhaseMantis } from './enemies/phaseMantis';
import { waveBuilder } from './enemies/utils/waveBuilder';
import { statModifierFactory } from './enemies/utils/statModifierFactory';
import { EnemyNames } from './enemies/enemyNames';
import { PurchaseCost } from '../sharedTypes';
import { ResourceNames } from '../resources/resourceNames';

function exhaustiveGuard(value: never): never {
  throw new Error(
    `Reached guard function with unexpected value: ${JSON.stringify(
      value,
    )}. Is switch/case missing a value?`,
  );
}

const enemyTypes = types.or(types.model(PhaseWorm), types.model(PhaseMantis));

const turretTypes = types.or();

const STARTING_PERIMETER_HEALTH = 50;

const EMPLACEMENT_LIMIT = 4;

const EMPLACEMENT_EXPONENT = 1.5;

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  enemies: tProp(types.array(enemyTypes), () => []),
  emplacementCount: tProp(types.number, 1),
  turrets: tProp(types.array(turretTypes), () => []),
  perimeterHealth: tProp(types.number, () => STARTING_PERIMETER_HEALTH),
}) {
  transientUnlockCheck = () => true;
  observableUnlockCheck = () => getRadar(this).unlocked;

  baseCost = [
    { resource: ResourceNames.ALLOY, quantity: 50 },
    { resource: ResourceNames.ROCK, quantity: 50 },
  ];

  /**
   * Allowed to puchase more turrets?
   */
  @computed
  get canPurchaseTurret() {
    return this.turrets.length < this.emplacementCount;
  }

  /**
   * Cost of next emplacement
   */
  @computed
  get emplacementCost(): PurchaseCost[] {
    return this.baseCost.map(({ resource, quantity: baseCost }) => {
      return {
        resource,
        quantity: Math.floor(
          baseCost * EMPLACEMENT_EXPONENT ** this.emplacementCount,
        ),
      };
    });
  }

  /**
   * New emplacement available to purchase?
   */
  @computed
  get belowEmplacementLimit() {
    return this.emplacementCount < EMPLACEMENT_LIMIT && !this.canPurchaseTurret;
  }

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
    while (this.enemies.length > 10) {
      this.enemies.shift();
    }
  }
}
