import { model, Model, tProp, types } from 'mobx-keystone';
import { enumKeys } from '../../../helpers/enumKeys';
import { BuildingNames } from './buildingNames';
import { Farm } from './farm';
import { Habitat } from './habitat';

@model('Buildings')
export class Buildings extends Model({
  [BuildingNames.Farm]: tProp(types.model(Farm), () => new Farm({})),
  [BuildingNames.Habitat]: tProp(types.model(Habitat), () => new Habitat({})),
}) {
  /**
   * Returns an iterable list of the building models
   */
  get asArray() {
    return enumKeys(BuildingNames).map((name) => {
      return this[name];
    });
  }
}
