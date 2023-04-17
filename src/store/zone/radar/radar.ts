import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { computed } from 'mobx';
import { getTech } from '../../selectors';
import { TechNames } from '../../tech/techNames';

const SCAN_TIME = 1000;

@model('Radar')
export class Radar extends ExtendedModel(ZoneEntity, {
  /**
   * Scanning time left, or null if not scanning
   */
  scanTimeLeft: tProp(types.maybeNull(types.number), SCAN_TIME),
  /**
   * Has the user closed the perimeter warning modal?
   */
  hasWarningModalBeenClosed: tProp(types.boolean, false),
}) {
  transientUnlockCheck = () => true;
  observableUnlockCheck = () => getTech(this)[TechNames.RADAR].researched;

  /**
   * Is the radar currently scanning?
   */
  @computed
  get isScanning(): boolean {
    return this.scanTimeLeft !== null && this.scanTimeLeft > 0;
  }

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
    if (this.unlocked && this.scanTimeLeft !== null) {
      this.scanTimeLeft = Math.max(0, this.scanTimeLeft - delta);
    }
  }
}
