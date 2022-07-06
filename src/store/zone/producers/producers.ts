import { model, Model, tProp, types } from 'mobx-keystone';
import { enumKeys } from '../../../helpers/enumKeys';
import { ProducerNames } from './producerNames';
import { Farm } from './farm';
import { Habitat } from './habitat';

@model('Producers')
export class Producers extends Model({
  [ProducerNames.FARM]: tProp(types.model(Farm), () => new Farm({})),
  [ProducerNames.HABITAT]: tProp(types.model(Habitat), () => new Habitat({})),
}) {
  /**
   * Returns an iterable list of the producer models
   */
  get asArray() {
    return enumKeys(ProducerNames).map((name) => {
      return this[name];
    });
  }

  /**
   * Iterable list of only unlocked actions
   */
  get unlocked() {
    return this.asArray.filter((action) => action.unlocked);
  }
}
