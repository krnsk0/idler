import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseUpgrade } from './baseUpgrade';
import { UpgradeNames } from './upgradeNames';

@model(UpgradeNames.CHAINSAWS)
export class Chainsaws extends ExtendedModel(BaseUpgrade, {}) {
  name = UpgradeNames.CHAINSAWS;
  displayName = 'chainsaws';
  description = 'new heights of tree-harvesting efficiency';
  transientUnlockCheck = () => true;
  modifiers = [
    {
      type: 'output_percent' as const,
      target: BuildingNames.TREE_FARM,
      resource: ResourceNames.LUMBER,
      percentChange: 0.1,
    },
  ];
  cost = [{ resource: ResourceNames.ALLOY, quantity: 10 }];
}
