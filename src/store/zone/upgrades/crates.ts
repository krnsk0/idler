import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseUpgrade } from './baseUpgrade';
import { UpgradeNames } from './upgradeNames';

@model(UpgradeNames.CRATES)
export class Crates extends ExtendedModel(BaseUpgrade, {}) {
  name = UpgradeNames.CRATES;
  displayName = 'crates';
  description =
    'expand cache storage through the construction of wooden crates';
  transientUnlockCheck = () => true;
  modifiers = [
    {
      type: 'storage_base' as const,
      target: BuildingNames.CACHE,
      resource: ResourceNames.LUMBER,
      baseChange: 5,
    },
  ];
  cost = [{ resource: ResourceNames.LUMBER, quantity: 25 }];
}
