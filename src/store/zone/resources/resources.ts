import { findParent, model, Model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../helpers/enumKeys';
import { Zone } from '../zone';
import { Nutrients } from './nutrients';
import { Biomass } from './biomass';
import { Lumber } from './lumber';
import { ResourceNames } from './resourceNames';

@model('Resources')
export class Resources extends Model({
  [ResourceNames.BIOMASS]: tProp(types.model(Biomass), () => new Biomass({})),
  [ResourceNames.LUMBER]: tProp(types.model(Lumber), () => new Lumber({})),
  [ResourceNames.NUTRIENTS]: tProp(
    types.model(Nutrients),
    () => new Nutrients({}),
  ),
}) {
  /**
   * Returns an iterable list of the resource models
   */
  @computed
  get asArray() {
    return enumKeys(ResourceNames).map((name) => {
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

  /**
   * Are any resources unlocked?
   */
  @computed
  get anyUnlocked(): boolean {
    return !!this.unlockedAsArray.length;
  }
}

export const getResources = (child: object): Resources => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getResources');
  return zone.resources;
};
