import { ExtendedModel, modelAction } from 'mobx-keystone';
import { computed } from 'mobx';
import { JobNames } from './jobNames';
import { getJobs, getTech, getGui } from '../../selectors';
import { Countable } from '../countable';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';

interface ProductionModifier {
  buildingName: BuildingNames;
  resourceName: ResourceNames;
  percentageModifier: number;
}

interface ProductionModifierDisplay {
  buildingDisplayName: string;
  resourceDisplayName: string;
  percentageModifier: number;
}

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
   * Production modifiers
   */
  abstract productionModifiers: ProductionModifier[];

  /**
   * Responsible for managing when jobs are unlocked
   */
  observableUnlockCheck = () => {
    return getTech(this).unlockedJobs.includes(this.name);
  };

  @computed
  get displayEffects(): ProductionModifierDisplay[] {
    return this.productionModifiers.map(
      ({ buildingName, resourceName, percentageModifier }) => {
        return {
          percentageModifier,
          resourceDisplayName: this.zoneResources[resourceName].displayName,
          buildingDisplayName: this.zoneBuildings[buildingName].displayName,
        };
      },
    );
  }

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
