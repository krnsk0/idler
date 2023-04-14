import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { computed } from 'mobx';
import { getGui } from '../../selectors';
import { ZoneTabNames } from '../../gui/gui';
import { observer } from 'mobx-react-lite';

const TIME_TO_UNLOCK_AFTER_FIRST_DYNAMO_CONSTRUCTION = 5;

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  /**
   * Perimeter unlocks 10s after first dynamo is constructed
   */
  timeToUnlock: tProp(types.maybe(types.number), undefined),
  /**
   * Has the user closed the perimeter warning modal?
   */
  hasWarningModalBeenClosed: tProp(types.boolean, false),
}) {
  transientUnlockCheck = () => {
    return this.timeToUnlock !== undefined && this.timeToUnlock <= 0;
  };
  // TODO - enable
  // observableUnlockCheck = () => this.timeToUnlock !== undefined;
  observableUnlockCheck = () => false;

  /**
   * Used in mechanism to unlock the perimeter for the first time
   * TODO: enable
   */
  startUnlockCountdown(): void {
    // if (this.timeToUnlock === undefined) {
    //   this.timeToUnlock = TIME_TO_UNLOCK_AFTER_FIRST_DYNAMO_CONSTRUCTION;
    // }
  }

  /**
   * Opens the warning modal when perimeter first unlocks
   * TODO: enable
   */
  @computed
  get isWarningModalOpen(): boolean {
    // return this.unlocked && this.hasWarningModalBeenClosed === false;
    return false;
  }

  /**
   * Closes the warning modal once and for all
   */
  @modelAction
  closeWarningModal(): void {
    this.hasWarningModalBeenClosed = true;
    getGui(this).selectTab(ZoneTabNames.PERIMETER);
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

  /**
   * Cheats unlocking the perimeter
   */
  @modelAction
  cheat(): void {
    this.timeToUnlock = 0;
    this.closeWarningModal();
  }
}
