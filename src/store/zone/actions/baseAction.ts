import { modelAction, ExtendedModel, tProp, types } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ZoneEntity } from '../zoneEntity';
import { ActionNames } from './actionNames';
import { computed } from 'mobx';

interface ActionInput {
  resource: ResourceNames;
  quantity: number;
}

interface ActionOutput {
  resource: ResourceNames;
  quantity: number;
}

export abstract class BaseAction extends ExtendedModel(ZoneEntity, {
  progress: tProp(types.number, 0),
  active: tProp(types.boolean, false),
}) {
  abstract name: ActionNames;
  abstract displayName: string;
  abstract description: string;
  abstract duration: number;
  abstract inputs: Array<ActionInput>; // consumed when action starts
  abstract outputs: Array<ActionOutput>; // received when action is done

  /**
   * Can this action be kicked off?
   */
  @computed
  get affordable(): boolean {
    return this.inputs.every(({ resource, quantity }) => {
      return this.zoneResources[resource].quantity >= quantity;
    });
  }

  /**
   * What happens when the action is done?
   */
  @modelAction
  onActionComplete(): void {
    this.outputs.every(({ resource, quantity }) => {
      this.zoneResources[resource].increase(quantity, { untracked: true });
    });
  }

  /**
   * Ticks the action's progress
   */
  @modelAction
  tick(delta: number): void {
    if (this.active) {
      const progressThisTick = delta / this.duration;
      if (this.progress + progressThisTick < 1) {
        this.progress += progressThisTick;
      } else {
        this.progress = 0;
        this.active = false;
        this.onActionComplete();
      }
    }
  }

  /**
   * Starts advancing progress bar on next tick
   */
  @modelAction
  start(): void {
    if (!this.active && this.affordable) {
      this.inputs.every(({ resource, quantity }) => {
        this.zoneResources[resource].decrease(quantity, { untracked: true });
      });
      this.active = true;
    }
  }
}
