import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { computed } from 'mobx';
import { getGui, getTech } from '../../selectors';
import { TechNames } from '../../tech/techNames';

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  /**
   * Has the user closed the perimeter warning modal?
   */
  hasWarningModalBeenClosed: tProp(types.boolean, false),
}) {
  transientUnlockCheck = () => true;
  observableUnlockCheck = () => getTech(this)[TechNames.RADAR].researched;

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
  }

  /**
   * The tick action for this model
   */
  @modelAction
  tick(delta: number) {
    // TODO
  }
}
