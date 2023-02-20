import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ModifierTypes } from '../modifiers';
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
      modifierType: ModifierTypes.OUTPUT,
      target: BuildingNames.TREE_FARM,
      resource: ResourceNames.LUMBER,
      modifier: {
        percentChange: 0.1,
      },
    },
  ];
  cost = [{ resource: ResourceNames.ALLOY, quantity: 10 }];
}
