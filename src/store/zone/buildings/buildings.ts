import { model, Model, tProp, types } from 'mobx-keystone';
import { enumValues } from '../../../helpers/enumValues';
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
    return enumValues(BuildingNames).map((name) => {
      return this[name];
    });
  }
}
