import { model, Model, tProp, types } from 'mobx-keystone';
import { enumKeys } from '../../../helpers/enumKeys';
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
    return enumKeys(ResourceNames).map((name) => {
      return this[name];
    });
  }
}
