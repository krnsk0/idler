import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseUpgrade } from './baseUpgrade';
import { UpgradeNames } from './upgradeNames';

@model(UpgradeNames.RECYCLING_TANKS)
export class RecyclingTanks extends ExtendedModel(BaseUpgrade, {}) {
  name = UpgradeNames.RECYCLING_TANKS;
  displayName = 'geologist';
  description = 'increases ore output of mines';
  transientUnlockCheck = () => true;
  productionModifiers = [
    {
      buildingName: BuildingNames.MINE,
      resourceName: ResourceNames.ORE,
      percentageModifier: 0.1,
    },
  ];
}
