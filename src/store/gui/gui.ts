import {
  findParent,
  model,
  Model,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { Root } from '../root';

@model('Gui')
export class Gui extends Model({
  techModalOpen: tProp(types.boolean, false),
}) {
  @modelAction
  openTechModal() {
    this.techModalOpen = true;
  }

  @modelAction
  closeTechModal() {
    this.techModalOpen = false;
  }
}
export const getGui = (child: object): Gui => {
  const zone = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!zone) throw new Error('no parent root model found in getGui');
  return zone.gui;
};
