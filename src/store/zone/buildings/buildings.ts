import { ExtendedModel, findParent, model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { BuildingNames } from './buildingNames';
import { Farm } from './farm';
import { Habitat } from './habitat';
import { Cache } from './cache';
import { Furnace } from './furnace';
import { ZoneEntity } from '../zoneEntity';
import { Dynamo } from './dynamo';
import { Zone } from '../zone';

@model('Buildings')
export class Buildings extends ExtendedModel(ZoneEntity, {
  [BuildingNames.FARM]: tProp(types.model(Farm), () => new Farm({})),
  [BuildingNames.HABITAT]: tProp(types.model(Habitat), () => new Habitat({})),
  [BuildingNames.CACHE]: tProp(types.model(Cache), () => new Cache({})),
  [BuildingNames.FURNACE]: tProp(types.model(Furnace), () => new Furnace({})),
  [BuildingNames.DYNAMO]: tProp(types.model(Dynamo), () => new Dynamo({})),
}) {
  transientUnlockCheck = () => !!this.unlockedAsArray.length;
  observableUnlockCheck = () => true;

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

export const getBuildings = (child: object): Buildings => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getZone');
  return zone.buildings;
};
