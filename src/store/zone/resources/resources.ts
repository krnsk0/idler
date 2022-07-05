import { findParent, model, Model, tProp, types } from 'mobx-keystone';
import { enumKeys } from '../../../helpers/enumKeys';
import { Zone } from '../zone';
import { Nutrients } from './nutrients';
import { Biomass } from './biomass';
import { ResourceNames } from './resourceNames';

@model('Resources')
export class Resources extends Model({
  [ResourceNames.BIOMASS]: tProp(
    types.model(Biomass),
    () => new Biomass({ quantity: 0 }),
  ),
  [ResourceNames.NUTRIENTS]: tProp(
    types.model(Nutrients),
    () => new Nutrients({ quantity: 1 }),
  ),
}) {
  /**
   * Returns an iterable list of the resource models
   */
  get asArray() {
    return enumKeys(ResourceNames).map((name) => {
      return this[name];
    });
  }
}

export const getResources = (child: object): Resources => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getResources');
  return zone.resources;
};
