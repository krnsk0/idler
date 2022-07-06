import {
  findParent,
  model,
  Model,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { Root } from '../root';

@model('Debug')
export class Debug extends Model({
  hyperMode: tProp(types.boolean, true),
}) {
  @modelAction
  setHyperMode(value: boolean) {
    this.hyperMode = true;
  }
}
export const getDebug = (child: object): Debug => {
  const zone = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!zone) throw new Error('no parent root model found in getDebug');
  return zone.debug;
};
