import { findParent, model, ExtendedModel, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { Zone } from '../zone';
import { Nutrients } from './nutrients';
import { Biomass } from './biomass';
import { Lumber } from './lumber';
import { Colonists } from './colonists';
import { ResourceNames } from './resourceNames';
import { Unlockable } from '../../unlockable';

@model('Resources')
export class Resources extends ExtendedModel(Unlockable, {
  [ResourceNames.COLONISTS]: tProp(
    types.model(Colonists),
    () => new Colonists({}),
  ),
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
   * Iterable list of only unlocked resources
   */
  @computed
  get unlockedAsArray() {
    return this.asArray.filter((resource) => resource.unlocked);
  }

  /**
   * When resource pane shows
   */
  unlockWhen = () => {
    return !!this.unlockedAsArray.length;
  };
}

export const getResources = (child: object): Resources => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getResources');
  return zone.resources;
};
