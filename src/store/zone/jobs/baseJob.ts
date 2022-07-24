import { ExtendedModel, tProp, types, modelAction } from 'mobx-keystone';
import { computed } from 'mobx';
import { JobNames } from './jobNames';
import { getTech } from '../../tech/tech';
import { TechEffectNames } from '../../tech/techEffectTypes';
import { getJobs } from './jobs';
import { ProducerConsumer } from '../producerConsumer';

export abstract class BaseJob extends ExtendedModel(ProducerConsumer, {
  unlocked: tProp(types.boolean, false),
}) {
  abstract name: JobNames;
  abstract displayName: string;
  abstract description: string;
  abstract unlockWhen: () => boolean;

  /**
   * Assign a free worker if possible
   */
  @modelAction
  assign(): void {
    this.quantity += 1;
  }

  /**
   * Unassign a free worker if possible
   */
  @modelAction
  unassign(): void {
    this.quantity -= 1;
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
    return this.quantity > 0;
  }

  /**
   * Add workers to this job
   */
  @modelAction
  increment(): void {
    if (this.canIncrement) {
      this.quantity += 1;
    }
  }

  /**
   * Remove workers from this job
   */
  @modelAction
  decrement(): void {
    if (this.canDecrement) {
      this.quantity -= 1;
    }
  }
  /**
   * Attempts to run production
   */
  @modelAction
  tick(delta: number): void {
    this.runProduction(delta);
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
