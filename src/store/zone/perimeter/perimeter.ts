import { ExtendedModel, model, modelAction } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { getRadar } from '../../selectors';

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {}) {
  transientUnlockCheck = () => true;
  observableUnlockCheck = () => getRadar(this).unlocked;

  /**
   * The tick action for this model
   */
  @modelAction
  tick(delta: number) {
    // TODO
  }
}
