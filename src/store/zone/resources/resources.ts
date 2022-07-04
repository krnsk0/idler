import { findParent, model, Model, tProp, types } from 'mobx-keystone';
import { enumValues } from '../../../helpers/enumValues';
import { Zone } from '../zone';
import { Nutrients } from './nutrients';
import { ResourceNames } from './resourceNames';

@model('Resources')
export class Resources extends Model({
  [ResourceNames.Nutrients]: tProp(
    types.model(Nutrients),
    () => new Nutrients({ quantity: 1 }),
  ),
}) {
  /**
   * Returns an iterable list of the building models
   */
  get asArray() {
    return enumValues(ResourceNames).map((name) => {
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
