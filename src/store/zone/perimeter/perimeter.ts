import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';

const TIME_TO_UNLOCK_AFTER_FIRST_DYNAMO_CONSTRUCTION = 5;

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  /**
   * Perimeter unlocks 10s after first dynamo is constructed
   */
  timeToUnlock: tProp(types.maybe(types.number), undefined),
}) {
  transientUnlockCheck = () => {
    return this.timeToUnlock !== undefined && this.timeToUnlock <= 0;
  };
  observableUnlockCheck = () => this.timeToUnlock !== undefined;

  /**
   * Used in mechanism to unlock the perimeter for the first time
   */
  startUnlockCountdown(): void {
    if (this.timeToUnlock === undefined) {
      this.timeToUnlock = TIME_TO_UNLOCK_AFTER_FIRST_DYNAMO_CONSTRUCTION;
    }
  }

  /**
   * The tick action for this model
   */
  @modelAction
  tick(delta: number) {
    if (this.timeToUnlock !== undefined) {
      this.timeToUnlock = Math.max(0, this.timeToUnlock - delta);
    }
  }
}
