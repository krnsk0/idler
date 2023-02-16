import { findParent, Model, model, tProp, types } from 'mobx-keystone';
import { nanoid } from 'nanoid';
import { Root } from './root';

export const CURRENT_SAVE_VERSION = '0.0.1';

/**
 * All animation frame update flow through the models that
 * get registered here
 */
@model('Metadata')
export class Metadata extends Model({
  saveVersion: tProp(types.string, () => CURRENT_SAVE_VERSION).withSetter(),
}) {}

export const getMetadata = (child: object): Metadata => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no game model found in getGame');
  return root.game.metadata;
};
