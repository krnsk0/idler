import { model, Model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
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
  @computed
  get asArray() {
    return enumKeys(ProducerNames).map((name) => {
      return this[name];
    });
  }

  /**
   * Iterable list of only unlocked actions
   */
  @computed
  get unlocked() {
    return this.asArray.filter((action) => action.unlocked);
  }

  /**
   * Are any resources unlocked?
   */
  @computed
  get anyUnlocked(): boolean {
    return !!this.unlocked.length;
  }
}
