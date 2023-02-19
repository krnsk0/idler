import { ExtendedModel, modelAction } from 'mobx-keystone';
import { computed } from 'mobx';
import { JobNames } from './jobNames';
import { getJobs, getTech, getGui } from '../../selectors';
import { Countable } from '../countable';

export abstract class BaseJob extends ExtendedModel(Countable, {}) {
  abstract name: JobNames;
  abstract displayName: string;
  abstract description: string;

  /**
   * The concept of disabling or enabling a job does not exist
   * where it does for other ProducerConsumers, as workers can just be
   * assigned/unassigned
   */
  canSomeBeTurnedOff = false;

  /**
   * People do not produce power
   */
  powerOutputPerSecond = 0;

  /**
   * People do not need power
   */
  powerNeededPerSecond = 0;

  /**
   * Responsible for managing when jobs are unlocked
   */
  observableUnlockCheck = () => {
    return getTech(this).unlockedJobs.includes(this.name);
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
   * Is the row expanded?
   */
  @computed
  get isExpanded(): boolean {
    return getGui(this).expandedJobRow === this.name;
  }

  /**
   * Expand this button
   */
  @modelAction
  expandButton() {
    getGui(this).setExpandedJobRow(this.name);
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
}
