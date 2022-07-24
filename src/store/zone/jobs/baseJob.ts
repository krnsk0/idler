import { ExtendedModel, tProp, types, modelAction } from 'mobx-keystone';
import { computed } from 'mobx';
import { ResourceNames } from '../resources/resourceNames';
import { JobNames } from './jobNames';
import { getTech } from '../../tech/tech';
import { TechEffectNames } from '../../tech/techEffectTypes';
import { getJobs } from './jobs';
import { getResources } from '../resources/resources';
import { ZoneEntity } from '../zoneEntity';

interface JobOutput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface JobInput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface JobEffectDisplay {
  resourceDisplayName: string;
  quantityPerSecond: number;
}

export abstract class BaseJob extends ExtendedModel(ZoneEntity, {
  quantity: tProp(types.number, 0),
  unlocked: tProp(types.boolean, false),
}) {
  abstract name: JobNames;
  abstract displayName: string;
  abstract description: string;
  abstract outputs: Array<JobOutput>;
  abstract inputs: Array<JobInput>;
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
   * For use in tooltips
   */
  @computed
  get displayEffects(): Array<JobEffectDisplay> {
    return [
      ...this.inputs.map(({ resource, quantityPerSecond }) => {
        return {
          resourceDisplayName: getResources(this)[resource].displayName,
          quantityPerSecond: -quantityPerSecond,
        };
      }),
      ...this.outputs.map(({ resource, quantityPerSecond }) => {
        return {
          resourceDisplayName: getResources(this)[resource].displayName,
          quantityPerSecond,
        };
      }),
    ];
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
   * TODO: only run when we have enough inputs
   * TODO: stop production when hitting maximums
   *
   */
  @modelAction
  tick(delta: number): void {
    this.outputs.forEach((product) => {
      const potentialProduction =
        product.quantityPerSecond * this.quantity * delta;
      const resourceModel = this.zoneResources[product.resource];
      resourceModel.increase(potentialProduction);
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
