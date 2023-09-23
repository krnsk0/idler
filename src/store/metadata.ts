import { Model, model, tProp, types } from 'mobx-keystone';

/**
 * Misc data that persists with the game
 */
@model('Metadata')
export class Metadata extends Model({
  saveVersion: tProp(types.maybe(types.string), undefined).withSetter(),
}) {}
