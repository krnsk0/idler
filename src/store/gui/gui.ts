import { model, Model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { ActionNames } from '../zone/actions/actionNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { ResourceNames } from '../zone/resources/resourceNames';
import { JobNames } from '../zone/jobs/jobNames';
import { getGame } from '../selectors';
import { UpgradeNames } from '../zone/upgrades/upgradeNames';

export const TechName = 'TECH' as const;

type ShipColonyExpandables =
  | ActionNames
  | BuildingNames
  | typeof TechName
  | undefined;

export enum ColorThemes {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

@model('Gui')
export class Gui extends Model({
  optionsModal: tProp(types.boolean, false),
  techModal: tProp(types.boolean, false),
  // UI should not subscribe to this,
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
  expandedUpgradeRow: tProp(types.maybe(types.enum(UpgradeNames)), undefined),
  colorTheme: tProp(types.enum(ColorThemes), ColorThemes.LIGHT).withSetter(),
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

  @modelAction
  setExpandedUpgradeRow(name: UpgradeNames | undefined) {
    if (name === this.expandedUpgradeRow) {
      this.expandedUpgradeRow = undefined;
    } else this.expandedUpgradeRow = name;
  }
}
