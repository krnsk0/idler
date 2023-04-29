import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { getRadar } from '../../selectors';
import { PhaseWorm } from './phaseWorm';

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  // TODO this will be union of all enemy types
  enemies: tProp(types.array(types.model(PhaseWorm)), () => [
    new PhaseWorm({ damageTaken: 5 }),
    new PhaseWorm({}),
    new PhaseWorm({ damageTaken: 5 }),
    new PhaseWorm({}),
    new PhaseWorm({}),
    new PhaseWorm({}),
    new PhaseWorm({}),
    new PhaseWorm({}),
  ]),
}) {
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
