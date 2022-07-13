import { Model, tProp, types, modelAction } from 'mobx-keystone';
import { computed } from 'mobx';
import { ResourceNames } from '../resources/resourceNames';
import { JobNames } from './jobNames';
import { getTech } from '../../tech/tech';
import { TechEffectNames } from '../../tech/techEffectTypes';
import { getJobs } from './jobs';

interface JobOutput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface JobInput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

export abstract class BaseJob extends Model({
  workers: tProp(types.number, 0),
  unlocked: tProp(types.boolean, false),
}) {
  abstract name: JobNames;
  abstract displayName: string;
  abstract description: string;
  abstract splashText: string;
  abstract outputs: Array<JobOutput>;
  abstract inputs: Array<JobInput>;
  abstract unlockWhen: () => boolean;

  /**
   * Assign a free worker if possible
   */
  @modelAction
  assign(): void {
    this.workers += 1;
  }

  /**
   * Unassign a free worker if possible
   */
  @modelAction
  unassign(): void {
    this.workers -= 1;
  }

  /**
   * Helper intended to be called in unlockWhen
   */
  @computed
  get isUnlockedByTech(): boolean {
    return !!getTech(this).allTechEffects.find((effect) => {
      return (
        effect.kind === TechEffectNames.JOB_UNLOCK &&
        effect.jobName === this.name
      );
    });
  }

  /**
   * Can we assign more workers?
   */
  @computed
  get canIncrement(): boolean {
    return getJobs(this).unassigned > 0;
  }

  /**
   * Can we unassign workers?
   */
  @computed
  get canDecrement(): boolean {
    return this.workers > 0;
  }

  /**
   * Add workers to this job
   */
  @modelAction
  increment(): void {
    if (this.canIncrement) {
      this.workers += 1;
    }
  }

  /**
   * Remove workers from this job
   */
  @modelAction
  decrement(): void {
    if (this.canDecrement) {
      this.workers -= 1;
    }
  }
  /**
   * Attempts to run production
   * TODO: only run when we have enough inputs
   * TODO: stop production when hitting maximums
   *
   */
  @modelAction
  tick(delta: number): void {
    this.outputs.forEach((product) => {
      // TODO: write this at all
    });
  }

  /**
   * Runs an unlock check
   */
  @modelAction
  unlockCheck(): void {
    if (!this.unlocked) {
      this.unlocked = this.unlockWhen();
    }
  }
}
