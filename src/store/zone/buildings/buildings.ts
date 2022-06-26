import { model, Model, tProp, types } from 'mobx-keystone';
import { BuildingNames } from './buildingNames';
import { Farm } from './producers/farm';
import { Habitat } from './providers/habitat';

@model('Buildings')
export class Buildings extends Model({
  [BuildingNames.Farm]: tProp(types.model(Farm), () => new Farm({})),
  [BuildingNames.Habitat]: tProp(types.model(Habitat), () => new Habitat({})),
}) {}
