import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { computed } from 'mobx';
import { getTech } from '../../selectors';
import { TechNames } from '../../tech/techNames';

enum RadarState {
  DISABLED = 'DISABLED',
  SCANNING = 'SCANNING',
  COUNTING_DOWN = 'COUNTING_DOWN',
}

const SCAN_TIME = 9.999;

const ARRIVAL_TIME = 9.999;

@model('Radar')
export class Radar extends ExtendedModel(ZoneEntity, {
  /**
   * State of radar
   */
  state: tProp(types.enum(RadarState), RadarState.DISABLED),
  /**
   * Time left
   */
  timeLeft: tProp(types.number, 0),
  /**
   * Has the user closed the perimeter warning modal?
   */
  hasWarningModalBeenClosed: tProp(types.boolean, false),
}) {
  transientUnlockCheck = () => true;
  observableUnlockCheck = () => getTech(this)[TechNames.RADAR].researched;

  /**
   * Are we scanning?
   */
  @computed
  get isScanning(): boolean {
    return this.state === RadarState.SCANNING;
  }

  /**
   * Are we counting down?
   */
  @computed
  get isCountingDown(): boolean {
    return this.state === RadarState.COUNTING_DOWN;
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
   * The tick action for this model.
   */
  @modelAction
  tick(delta: number) {
    if (!this.unlocked) return;

    // enable for first time
    if (this.state === RadarState.DISABLED) {
      this.state = RadarState.SCANNING;
      this.timeLeft = SCAN_TIME;
    }
    // decrement
    this.timeLeft -= delta;

    // finish scan
    if (this.state === RadarState.SCANNING && this.timeLeft <= 0) {
      this.state = RadarState.COUNTING_DOWN;
      this.timeLeft = ARRIVAL_TIME;
    }

    // finish countdown
    if (this.state === RadarState.COUNTING_DOWN && this.timeLeft <= 0) {
      this.state = RadarState.SCANNING;
      this.timeLeft = SCAN_TIME;
    }
  }
}
