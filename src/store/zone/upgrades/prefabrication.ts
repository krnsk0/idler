import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseUpgrade } from './baseUpgrade';
import { UpgradeNames } from './upgradeNames';

@model(UpgradeNames.PREFABRICATION)
export class Prefabrication extends ExtendedModel(BaseUpgrade, {}) {
  name = UpgradeNames.PREFABRICATION;
  displayName = 'prefabrication';
  description = 'a new method of habitat construction promises to reduce costs';
  transientUnlockCheck = () => true;
  modifiers = [
    {
      type: 'cost_scaling' as const,
      target: BuildingNames.HABITAT,
      resource: ResourceNames.LUMBER,
      scaleFactorPercentModifier: -0.25,
    },
  ];
  cost = [{ resource: ResourceNames.LUMBER, quantity: 20 }];
}
