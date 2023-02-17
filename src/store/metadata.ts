import { Model, model, tProp, types } from 'mobx-keystone';

/**
 * All animation frame update flow through the models that
 * get registered here
 */
@model('Metadata')
export class Metadata extends Model({
  saveVersion: tProp(
    types.string,
    () => import.meta.env.PACKAGE_VERSION,
  ).withSetter(),
}) {}
