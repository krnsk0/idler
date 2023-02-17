import { model, ExtendedModel, tProp, types, modelAction } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { Nutrients } from './nutrients';
import { Biomass } from './biomass';
import { Lumber } from './lumber';
import { Colonists } from './colonists';
import { ResourceNames } from './resourceNames';
import { ZoneEntity } from '../zoneEntity';
import { Rock } from './rock';
import { Ore } from './ore';
import { Alloy } from './alloy';

@model('Resources')
export class Resources extends ExtendedModel(ZoneEntity, {
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
  [ResourceNames.ROCK]: tProp(types.model(Rock), () => new Rock({})),
  [ResourceNames.ORE]: tProp(types.model(Ore), () => new Ore({})),
  [ResourceNames.ALLOY]: tProp(types.model(Alloy), () => new Alloy({})),
}) {
  transientUnlockCheck = () => !!this.unlockedAsArray.length;
  observableUnlockCheck = () => true;

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
}
