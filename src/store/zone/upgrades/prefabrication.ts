import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ModifierTypes } from '../modifiers';
import { ResourceNames } from '../resources/resourceNames';
import { BaseUpgrade } from './baseUpgrade';
import { UpgradeNames } from './upgradeNames';

@model(UpgradeNames.PREFABRICATION)
export class Prefabrication extends ExtendedModel(BaseUpgrade, {}) {
  name = UpgradeNames.PREFABRICATION;
  displayName = 'prefabrication';
  description =
    'a new method of habitat construction promises to reduces costs';
  transientUnlockCheck = () => true;
  modifiers = [
    {
      modifierType: ModifierTypes.COST,
      target: BuildingNames.HABITAT,
      resource: ResourceNames.LUMBER,
      modifier: {
        baseChange: -2,
      },
    },
  ];
  cost = [{ resource: ResourceNames.LUMBER, quantity: 20 }];
}
