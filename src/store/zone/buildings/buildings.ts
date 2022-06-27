import { model, Model, tProp, types } from 'mobx-keystone';
import { BuildingNames } from './buildingNames';
import { BaseBuilding } from './baseBuilding';
import { Farm } from './farm';
import { Habitat } from './habitat';

@model('Buildings')
export class Buildings extends Model({
  [BuildingNames.Farm]: tProp(types.model(Farm), () => new Farm({})),
  [BuildingNames.Habitat]: tProp(types.model(Habitat), () => new Habitat({})),
}) {
  get list() {
    return Object.keys(BuildingNames).map((name) => {
      return this[name as BuildingNames];
    });
  }
}
