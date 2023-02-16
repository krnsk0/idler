import { Model, model, tProp, types } from 'mobx-keystone';

export const CURRENT_SAVE_VERSION = '0.0.1';

/**
 * All animation frame update flow through the models that
 * get registered here
 */
@model('Metadata')
export class Metadata extends Model({
  saveVersion: tProp(types.string, () => CURRENT_SAVE_VERSION).withSetter(),
}) {}
