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
  toggleHyperMode() {
    console.log('toggling');
    this.hyperMode = !this.hyperMode;
  }
}
export const getDebug = (child: object): Debug => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no parent root model found in getDebug');
  return root.debug;
};
