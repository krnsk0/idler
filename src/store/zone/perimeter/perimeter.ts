import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { getRadar } from '../../selectors';
import { waveBuilder } from '../../enemies/utils/waveBuilder';
import { statModifierFactory } from '../../enemies/utils/statModifierFactory';
import { PurchaseCost, PurchaseCostDisplay } from '../sharedTypes';
import { ResourceNames } from '../resources/resourceNames';
import { Autoballista } from '../../turrets/autoballista';
import { BaseTurret } from '../../turrets/baseTurret';
import { PhaseWorm } from '../../enemies/phaseWorm';
import { PhaseMantis } from '../../enemies/phaseMantis';
import { EnemyNames } from '../../enemies/enemyNames';

function exhaustiveGuard(value: never): never {
  throw new Error(
    `Reached guard function with unexpected value: ${JSON.stringify(
      value,
    )}. Is switch/case missing a value?`,
  );
}

const enemyTypes = types.or(types.model(PhaseWorm), types.model(PhaseMantis));

const turretTypes = types.or(types.model(Autoballista));

const STARTING_PERIMETER_HEALTH = 50;

export const EMPLACEMENT_LIMIT = 4;

const EMPLACEMENT_EXPONENT = 1.5;

// first emplacement is free
const BASE_EMPLACEMENT_COSTS = [
  { resource: ResourceNames.ALLOY, quantity: 30 },
  { resource: ResourceNames.ROCK, quantity: 35 },
];

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  enemies: tProp(types.array(enemyTypes), () => []),
  emplacementCount: tProp(types.number, 1),
  turrets: tProp(types.array(turretTypes), () => []),
  perimeterHealth: tProp(types.number, () => STARTING_PERIMETER_HEALTH),
  turretPurchaseIndex: tProp(types.maybe(types.number), () => undefined),
}) {
  transientUnlockCheck = () => true;
  observableUnlockCheck = () => getRadar(this).unlocked;

  /**
   * Is turret purchase modal open
   */
  @computed
  get isTurretPurchaseModalOpen() {
    return this.turretPurchaseIndex !== undefined;
  }

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
  get emplacementCosts(): PurchaseCost[] {
    return BASE_EMPLACEMENT_COSTS.map(({ resource, quantity: baseCost }) => {
      return {
        resource,
        quantity: Math.floor(
          baseCost * EMPLACEMENT_EXPONENT ** (this.emplacementCount - 1),
        ),
      };
    });
  }

  /**
   * Current cost with displayable names
   */
  @computed
  get emplacementCostDisplay(): PurchaseCostDisplay[] {
    return this.emplacementCosts.map(({ resource, quantity }) => {
      const resourceModel = this.zoneResources[resource];
      return {
        resourceDisplayName: resourceModel.displayName,
        isSatisfied: resourceModel.quantity >= quantity,
        availableQuantity: resourceModel.quantity,
        storageConstrained: quantity > resourceModel.currentCap,
        quantity,
      };
    });
  }

  /**
   * Can this entity be bought?
   */
  @computed
  get emplacementAffordable(): boolean {
    return this.emplacementCosts.every(({ resource, quantity }) => {
      return this.zoneResources[resource].quantity >= quantity;
    });
  }

  /**
   * New emplacement available to purchase?
   */
  @computed
  get newEmplacementAvailable() {
    return (
      this.emplacementCount < EMPLACEMENT_LIMIT &&
      !this.canPurchaseTurret &&
      this.turrets.length < EMPLACEMENT_LIMIT
    );
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
   * Are targets present?
   */
  @computed
  get areTargetsPresent() {
    return this.enemies.some((enemy) => enemy.isAlive);
  }

  /**
   * All are turrents out of ammo
   */
  @computed
  get isAmmoEmpty() {
    return (
      this.turrets.length > 0 &&
      this.turrets.every((turret) => turret.isAmmoEmpty)
    );
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
   * Construct a new turret
   */
  @modelAction
  constructTurret(turretIndex: number, turretFactory: () => BaseTurret) {
    const turret = turretFactory();
    this.turrets.splice(turretIndex, 1, turret);
  }

  /**
   * Purchase a new emplacement
   */
  @modelAction
  purchaseEmplacement() {
    if (this.emplacementAffordable) {
      this.emplacementCosts.forEach(({ resource, quantity }) => {
        this.zoneResources[resource].decrease(quantity, { untracked: true });
      });
      this.emplacementCount += 1;
    }
  }

  /**
   * Attack first enemy
   */
  @modelAction
  attackEnemy(damage: number) {
    const enemy = this.enemies.find((enemy) => enemy.isAlive);
    if (enemy) {
      enemy.takeDamage(damage);
    }
  }

  @modelAction
  openTurretPurchaseModal(turretIndex: number): void {
    this.turretPurchaseIndex = turretIndex;
  }

  @modelAction
  closeTurretPurchaseModal(): void {
    this.turretPurchaseIndex = undefined;
  }

  /**
   * The tick action for this model
   */
  @modelAction
  tick(delta: number) {
    this.enemies.forEach((enemy) => enemy.tick(delta));
    this.turrets.forEach((turret) => turret.tick(delta));

    // TODO REMOVE THIS
    // if enemy array is over 10, limit it to 10 items
    // while (this.enemies.length > 10) {
    //   this.enemies.shift();
    // }
  }
}
