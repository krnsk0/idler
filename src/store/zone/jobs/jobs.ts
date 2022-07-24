import {
  findParent,
  model,
  Model,
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

@model('Jobs')
export class Jobs extends Model({
  [JobNames.ARBORIST]: tProp(types.model(Arborist), () => new Arborist({})),
}) {
  /**
   * Returns an iterable list of the producer models
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
   * Are any resources unlocked?
   */
  @computed
  get anyUnlocked(): boolean {
    return !!this.unlockedAsArray.length;
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
      assigned += job.workers;
    }

    return this.totalColonists - assigned;
  }

  /**
   * Kills off a colonist, unassigning from a random job first
   */
  @modelAction
  killColonist(): void {
    // TODO: unassign from random job
    const colonists = getResources(this)[ResourceNames.COLONISTS];
    colonists.decrease(1, { untracked: true });
  }

  /**
   * This handles colonists consuming food every tick and possible
   * death of colonists. Colonists have a chance of dying when there is
   * no food.
   */
  @modelAction
  tick(delta: number): void {
    const colonists = getResources(this)[ResourceNames.COLONISTS];
    const nutrients = getResources(this)[ResourceNames.NUTRIENTS];
    const foodConsumptionPerWorkerPerSec = 0.2;
    const chanceOfEachWorkerDyingPerSecond = 0.25; // percent

    const amountToEat =
      colonists.quantity * foodConsumptionPerWorkerPerSec * delta;

    nutrients.decrease(amountToEat);

    if (nutrients.quantity <= 0 && colonists.quantity > 0) {
      const chanceOfAWorkerDyingThisTick =
        delta * chanceOfEachWorkerDyingPerSecond;

      for (let i = 0; i < colonists.quantity; i += 1) {
        const diceRoll = Math.random();
        if (diceRoll < chanceOfAWorkerDyingThisTick) {
          this.killColonist();
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
