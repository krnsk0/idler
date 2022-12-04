import { ExtendedModel, tProp, types, modelAction } from 'mobx-keystone';
import { computed } from 'mobx';
import { JobNames } from './jobNames';
import { getJobs } from './jobs';
import { ProducerConsumer } from '../producerConsumer';

export abstract class BaseJob extends ExtendedModel(ProducerConsumer, {}) {
  abstract name: JobNames;
  abstract displayName: string;
  abstract description: string;

  /**
   * Responsible for managing when actions are unlocked
   * TODO
   */
  observableUnlockCheck = () => {
    return true;
  };

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
}
