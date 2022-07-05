import { modelAction, ExtendedModel, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { ActionNames } from './actionNames';

export abstract class BaseAction extends ExtendedModel(ZoneEntity, {
  progress: tProp(types.number, 0),
  active: tProp(types.boolean, false),
}) {
  abstract name: ActionNames;
  abstract displayName: string;
  abstract description: string;
  abstract duration: number;
  abstract onActionComplete(): void;

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
    this.active = true;
  }
}
