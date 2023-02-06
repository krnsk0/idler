import {
  findParent,
  model,
  Model,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { Root } from '../root';
import { getGame } from '../game';
import { ActionNames } from '../zone/actions/actionNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { ResourceNames } from '../zone/resources/resourceNames';

export const TechName = 'TECH' as const;

type ShipColonyExpandables =
  | ActionNames
  | BuildingNames
  | typeof TechName
  | undefined;

@model('Gui')
export class Gui extends Model({
  optionsModal: tProp(types.boolean, false),
  techModal: tProp(types.boolean, false),
  // UI should not subscript to this,
  // use the derivation instead
  _resourcePaneOpen: tProp(types.boolean, true),
  expandedShipColonyButton: tProp(
    types.maybe(
      types.or(
        types.enum(ActionNames),
        types.enum(BuildingNames),
        types.literal(TechName),
      ),
    ),
    undefined,
  ),
}) {
  @modelAction
  openTechModal(): void {
    this.techModal = true;
  }

  @modelAction
  closeTechModal(): void {
    this.techModal = false;
  }

  @modelAction
  openOptionsModal(): void {
    this.optionsModal = true;
  }

  @modelAction
  closeOptionsModal(): void {
    this.optionsModal = false;
  }

  @modelAction
  toggleResourcePane(): void {
    this._resourcePaneOpen = !this._resourcePaneOpen;
  }

  @computed
  get isResourcePaneOpen(): boolean {
    const selectedZone = getGame(this).selectedZone;
    const resourcesUnlocked = selectedZone?.resources.unlocked ?? false;
    return resourcesUnlocked && this._resourcePaneOpen;
  }

  @computed
  get areSideTooltipsVisible(): boolean {
    return (
      getGame(this).selectedZone?.resources[ResourceNames.BIOMASS].unlocked ??
      false
    );
  }

  @modelAction
  setExpandedShipColonyButton(name: ShipColonyExpandables) {
    if (name === this.expandedShipColonyButton) {
      this.expandedShipColonyButton = undefined;
    } else this.expandedShipColonyButton = name;
  }
}

export const getGui = (child: object): Gui => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no parent root model found in getGui');
  return root.gui;
};
