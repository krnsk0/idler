import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { JobNames } from './jobNames';
import { Arborist } from './arborist';
import { Agronomist } from './agronomist';
import { Geologist } from './geologist';
import { ResourceNames } from '../resources/resourceNames';
import { pickRandomArrayElm } from '../../../utils/pickRandomArrayElm';
import { ZoneEntity } from '../zoneEntity';
import { getResources } from '../../selectors';
import { FOOD_PER_WORKER_PER_SECOND_BASE } from '../resources/colonists';
import { ProductionModifier, ProductionModifierDisplay } from '../sharedTypes';

@model('Jobs')
export class Jobs extends ExtendedModel(ZoneEntity, {
  [JobNames.ARBORIST]: tProp(types.model(Arborist), () => new Arborist({})),
  [JobNames.AGRONOMIST]: tProp(
    types.model(Agronomist),
    () => new Agronomist({}),
  ),
  [JobNames.GEOLOGIST]: tProp(types.model(Geologist), () => new Geologist({})),
}) {
  transientUnlockCheck = () => {
    return (
      !!this.unlockedAsArray.length &&
      getResources(this)[ResourceNames.COLONISTS].quantity > 0
    );
  };
  observableUnlockCheck = () => true;

  /**
   * Returns an iterable list of the job models
   */
  @computed
  get asArray() {
    return enumKeys(JobNames).map((name) => {
      return this[name];
    });
  }

  /**
   * Iterable list of only unlocked jobs
   */
  @computed
  get unlockedAsArray() {
    return this.asArray.filter((job) => job.unlocked);
  }

  /**
   * Total colonists. Convenience getter
   */
  @computed
  get totalColonists(): number {
    return getResources(this)[ResourceNames.COLONISTS].quantity;
  }

  /**
   * number of unassinged colonists in all jobs
   */
  @computed
  get unassigned(): number {
    let assigned = 0;
    for (const job of this.asArray) {
      assigned += job.quantity;
    }

    return this.totalColonists - assigned;
  }

  /**
   * Amount to eat each second
   */
  @computed
  get foodConsumption(): number {
    const colonists = getResources(this)[ResourceNames.COLONISTS];
    return colonists.quantity * FOOD_PER_WORKER_PER_SECOND_BASE;
  }

  /**
   * All job modifiers
   */
  @computed
  get totalProductionModifiers(): ProductionModifier[] {
    const modifiers: ProductionModifier[] = [];
    this.asArray.forEach(({ totalProductionModifiers }) => {
      totalProductionModifiers.forEach((modifier) => {
        if (modifier.percentageModifier > 0) {
          modifiers.push(modifier);
        }
      });
    });
    return modifiers;
  }

  /**
   * All job modifiers, for display
   */
  @computed
  get totalProductionModifiersDisplay(): ProductionModifierDisplay[] {
    const modifiers: ProductionModifierDisplay[] = [];
    this.asArray.forEach(({ displayTotalEffects }) => {
      displayTotalEffects.forEach((modifier) => {
        if (modifier.percentageModifier > 0) {
          modifiers.push(modifier);
        }
      });
    });
    return modifiers;
  }

  /**
   * Kills off a colonist, unassigning from a random job first
   */
  @modelAction
  killColonist(): void {
    const decrementable = this.asArray.filter((job) => job.canDecrement);
    if (decrementable.length) {
      pickRandomArrayElm(decrementable).decrement();
    }

    const colonists = getResources(this)[ResourceNames.COLONISTS];
    colonists.decrease(1, { untracked: true });
  }

  /**
   * This handles colonists consuming food every tick and possible
   * death of colonists. Colonists have a chance of dying when there is
   * no food. Can only kill one colonist per tick.
   */
  @modelAction
  tick(delta: number): void {
    const colonists = getResources(this)[ResourceNames.COLONISTS];
    const nutrients = getResources(this)[ResourceNames.NUTRIENTS];
    const chanceOfEachWorkerDyingPerSecond = 0.15; // percent

    const amountToEat = this.foodConsumption * delta;

    nutrients.decrease(amountToEat);

    /**
     * Important to check for *less* than zero
     */
    if (nutrients.quantity < 0 && colonists.quantity > 0) {
      const chanceOfAWorkerDyingThisTick =
        delta * chanceOfEachWorkerDyingPerSecond;

      for (let i = 0; i < colonists.quantity; i += 1) {
        const diceRoll = Math.random();
        if (diceRoll < chanceOfAWorkerDyingThisTick) {
          this.killColonist();
          break;
        }
      }
    }
  }
}
