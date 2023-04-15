import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { computed } from 'mobx';
import { getGui } from '../../selectors';
import { ZoneTabNames } from '../../gui/gui';

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  /**
   * Has the user closed the perimeter warning modal?
   */
  hasWarningModalBeenClosed: tProp(types.boolean, false),
}) {
  transientUnlockCheck = () => true;
  // TODO
  observableUnlockCheck = () => true;

  /**
   * Opens the warning modal when perimeter first unlocks
   */
  @computed
  get isWarningModalOpen(): boolean {
    return this.unlocked && this.hasWarningModalBeenClosed === false;
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
    // TODO
  }
}
