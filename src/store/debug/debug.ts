import {
  findParent,
  model,
  Model,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { getGame } from '../game';
import { Root } from '../root';

@model('Debug')
export class Debug extends Model({
  hyperMode: tProp(types.boolean, false),
}) {
  @modelAction
  toggleHyperMode() {
    this.hyperMode = !this.hyperMode;
    console.log('hyper', this.hyperMode);
  }

  @modelAction
  phaseOne() {
    const initialZone = getGame(this).initialZone;
  }
}
export const getDebug = (child: object): Debug => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no parent root model found in getDebug');
  return root.debug;
};
