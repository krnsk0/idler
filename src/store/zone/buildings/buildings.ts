import { ExtendedModel, model, Model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { BuildingNames } from './buildingNames';
import { Farm } from './farm';
import { Habitat } from './habitat';
import { Cache } from './cache';
import { ZoneEntity } from '../zoneEntity';

@model('Buildings')
export class Buildings extends ExtendedModel(ZoneEntity, {
  [BuildingNames.FARM]: tProp(types.model(Farm), () => new Farm({})),
  [BuildingNames.HABITAT]: tProp(types.model(Habitat), () => new Habitat({})),
  [BuildingNames.CACHE]: tProp(types.model(Cache), () => new Cache({})),
}) {
  transientUnlockCheck = () => !!this.unlockedAsArray.length;

  @computed
  get observableUnlockCheck(): boolean {
    return true;
  }

  /**
   * Returns an iterable list of the building models
   */
  @computed
  get asArray() {
    return enumKeys(BuildingNames).map((name) => {
      return this[name];
    });
  }

  /**
   * Iterable list of only unlocked actions
   */
  @computed
  get unlockedAsArray() {
    return this.asArray.filter((action) => action.unlocked);
  }
}
