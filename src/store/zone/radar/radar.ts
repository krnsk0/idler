import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { computed } from 'mobx';
import { getPerimeter, getTech } from '../../selectors';
import { TechNames } from '../../tech/techNames';

enum RadarState {
  DISABLED = 'DISABLED',
  WARNING_MODAL_OPEN = 'WARNING_MODAL_OPEN',
  SCANNING = 'SCANNING',
  COUNTING_DOWN = 'COUNTING_DOWN',
}

// seconds
const SCAN_TIME = 4.999;

// seconds
const ARRIVAL_TIME = 119.999;

// seconds
const WARNING_MODAL_TIME = 9.999;

@model('Radar')
export class Radar extends ExtendedModel(ZoneEntity, {
  state: tProp(types.enum(RadarState), RadarState.DISABLED),
  timeLeft: tProp(types.number, 0),
  currentWave: tProp(types.number, 1),
}) {
  transientUnlockCheck = () => true;
  observableUnlockCheck = () =>
    this.state !== RadarState.DISABLED &&
    this.state !== RadarState.WARNING_MODAL_OPEN;

  /**
   * Is warning modal open?
   */
  @computed
  get warningModalOpen(): boolean {
    return this.state === RadarState.WARNING_MODAL_OPEN;
  }

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
   * Closes the warning modal once and for all
   */
  @modelAction
  closeWarningModal(): void {
    this.state = RadarState.SCANNING;
    this.timeLeft = SCAN_TIME;
  }

  @modelAction
  rushNextWave(): void {
    this.state = RadarState.COUNTING_DOWN;
    this.timeLeft = 0;
  }

  /**
   * The tick action for this model.
   */
  @modelAction
  tick(delta: number) {
    if (!getTech(this)[TechNames.RADAR].researched) return;

    // open modal for first time
    if (this.state === RadarState.DISABLED) {
      this.state = RadarState.WARNING_MODAL_OPEN;
      this.timeLeft = WARNING_MODAL_TIME;
      return;
    }

    // decrement
    this.timeLeft -= delta;

    // close modal
    if (this.state === RadarState.WARNING_MODAL_OPEN && this.timeLeft <= 0) {
      this.closeWarningModal();
    }

    // finish scan
    if (this.state === RadarState.SCANNING && this.timeLeft <= 0) {
      this.state = RadarState.COUNTING_DOWN;
      this.timeLeft = ARRIVAL_TIME;
    }

    // finish countdown
    if (this.state === RadarState.COUNTING_DOWN && this.timeLeft <= 0) {
      this.state = RadarState.SCANNING;
      this.timeLeft = SCAN_TIME;
      this.currentWave += 1;
      getPerimeter(this).startWave(this.currentWave);
    }
  }
}
