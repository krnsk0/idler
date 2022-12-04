import {
  ExtendedModel,
  findParent,
  model,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { JobNames } from './jobNames';
import { Arborist } from './arborist';
import { getResources } from '../resources/resources';
import { ResourceNames } from '../resources/resourceNames';
import { Zone } from '../zone';
import { pickRandomArrayElm } from '../../../utils/pickRandomArrayElm';
import { ZoneEntity } from '../zoneEntity';

const foodConsumptionPerWorkerPerSec = 0.1;

@model('Jobs')
export class Jobs extends ExtendedModel(ZoneEntity, {
  [JobNames.ARBORIST]: tProp(types.model(Arborist), () => new Arborist({})),
}) {
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
   * Are any jobs unlocked?
   */
  unlockWhen = {
    observable: () => {
      return true;
    },
    transient: () => {
      return !!this.unlockedAsArray.length;
    },
  };

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
    return colonists.quantity * foodConsumptionPerWorkerPerSec;
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

export const getJobs = (child: object): Jobs => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent jobs model found in getJobs');
  return zone.jobs;
};
