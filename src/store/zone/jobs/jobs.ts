import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { JobNames } from './jobNames';
import { Gleaner } from './gleaner';
import { Arborist } from './arborist';
import { Agronomist } from './agronomist';
import { Geologist } from './geologist';
import { ResourceNames } from '../resources/resourceNames';
import { pickRandomArrayElm } from '../../../utils/pickRandomArrayElm';
import { ZoneEntity } from '../zoneEntity';
import { getResources } from '../../selectors';
import { FOOD_PER_WORKER_PER_SECOND_BASE } from '../resources/colonists';

@model('Jobs')
export class Jobs extends ExtendedModel(ZoneEntity, {
  [JobNames.GLEANER]: tProp(types.model(Gleaner), () => new Gleaner({})),
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
    const food = getResources(this)[ResourceNames.FOOD];
    const chanceOfEachWorkerDyingPerSecond = 0.15; // percent

    const amountToEat = this.foodConsumption * delta;

    food.decrease(amountToEat);

    /**
     * Important to check for *less* than zero
     */
    if (food.quantity < 0 && colonists.quantity > 0) {
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
