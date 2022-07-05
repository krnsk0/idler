import { model, Model, tProp, types } from 'mobx-keystone';
import { enumKeys } from '../../../helpers/enumKeys';
import { ProducerNames } from './producerNames';
import { Farm } from './farm';
import { Habitat } from './habitat';

@model('Buildings')
export class Buildings extends Model({
  [ProducerNames.FARM]: tProp(types.model(Farm), () => new Farm({})),
  [ProducerNames.HABITAT]: tProp(types.model(Habitat), () => new Habitat({})),
}) {
  /**
   * Returns an iterable list of the building models
   */
  get asArray() {
    return enumKeys(ProducerNames).map((name) => {
      return this[name];
    });
  }
}
