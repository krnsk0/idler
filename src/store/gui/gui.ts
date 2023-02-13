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
import { JobNames } from '../zone/jobs/jobNames';

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
  expandedResourceRow: tProp(types.maybe(types.enum(ResourceNames)), undefined),
  expandedJobRow: tProp(types.maybe(types.enum(JobNames)), undefined),
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
  get areTooltipsVisible(): boolean {
    return (
      getGame(this).selectedZone?.resources[ResourceNames.BIOMASS].unlocked ??
      false
    );
  }

  showTooltipEntranceAnimation(): boolean {
    return (
      getGame(this).selectedZone?.resources[
        ResourceNames.BIOMASS
      ].showEntranceAnimation() ?? false
    );
  }

  @modelAction
  setExpandedShipColonyButton(name: ShipColonyExpandables) {
    if (name === this.expandedShipColonyButton) {
      this.expandedShipColonyButton = undefined;
    } else this.expandedShipColonyButton = name;
  }

  @modelAction
  setExpandedResourceRow(name: ResourceNames | undefined) {
    if (name === this.expandedResourceRow) {
      this.expandedResourceRow = undefined;
    } else this.expandedResourceRow = name;
  }

  @modelAction
  setExpandedJobRow(name: JobNames | undefined) {
    if (name === this.expandedJobRow) {
      this.expandedJobRow = undefined;
    } else this.expandedJobRow = name;
  }
}

export const getGui = (child: object): Gui => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no parent root model found in getGui');
  return root.gui;
};
